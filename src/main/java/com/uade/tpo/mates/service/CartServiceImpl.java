package com.uade.tpo.mates.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.mates.controllers.cart.AddCartItemRequest;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.OrderDetail;
import com.uade.tpo.mates.entity.OrderStatus;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.CartEmptyException;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.InvalidQuantityException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ProductNotInCartException;
import com.uade.tpo.mates.repository.OrderRepository;
import com.uade.tpo.mates.repository.ProductRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Optional<Order> getCart(User user) {
        return orderRepository.findByUserIdAndStatus(user.getId(), OrderStatus.PENDING);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order addItem(User user, AddCartItemRequest request)
            throws ProductNotFoundException, InsufficientStockException, InvalidQuantityException {

        if (request.getQuantity() == null || request.getQuantity() <= 0)
            throw new InvalidQuantityException();

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(ProductNotFoundException::new);

        Order cart = orderRepository.findByUserIdAndStatus(user.getId(), OrderStatus.PENDING)
                .orElseGet(() -> Order.builder()
                        .user(user)
                        .status(OrderStatus.PENDING)
                        .total(BigDecimal.ZERO)
                        .build());

        Optional<OrderDetail> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        int requestedTotalQuantity = request.getQuantity() + existingItem.map(OrderDetail::getQuantity).orElse(0);

        if (product.getStock() < requestedTotalQuantity)
            throw new InsufficientStockException();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(requestedTotalQuantity);
        } else {
            OrderDetail detail = OrderDetail.builder()
                    .order(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .unitPrice(product.getFinalPrice())
                    .build();
            cart.getItems().add(detail);
        }

        recalculateTotal(cart);
        return orderRepository.save(cart);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order updateItemQuantity(User user, Long productId, Integer quantity)
            throws CartEmptyException, ProductNotInCartException, InsufficientStockException {

        Order cart = orderRepository.findByUserIdAndStatus(user.getId(), OrderStatus.PENDING)
                .orElseThrow(CartEmptyException::new);

        OrderDetail item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(ProductNotInCartException::new);

        if (quantity == null || quantity <= 0) {
            cart.getItems().remove(item);
        } else {
            if (item.getProduct().getStock() < quantity)
                throw new InsufficientStockException();
            item.setQuantity(quantity);
        }

        recalculateTotal(cart);
        return orderRepository.save(cart);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order removeItem(User user, Long productId) throws CartEmptyException, ProductNotInCartException {
        Order cart = orderRepository.findByUserIdAndStatus(user.getId(), OrderStatus.PENDING)
                .orElseThrow(CartEmptyException::new);

        OrderDetail item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(ProductNotInCartException::new);

        cart.getItems().remove(item);

        recalculateTotal(cart);
        return orderRepository.save(cart);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order checkout(User user) throws CartEmptyException, InsufficientStockException {
        Order cart = orderRepository.findByUserIdAndStatus(user.getId(), OrderStatus.PENDING)
                .orElseThrow(CartEmptyException::new);

        if (cart.getItems().isEmpty())
            throw new CartEmptyException();

        for (OrderDetail item : cart.getItems()) {
            if (item.getProduct().getStock() < item.getQuantity())
                throw new InsufficientStockException();
        }

        for (OrderDetail item : cart.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        cart.setStatus(OrderStatus.PAID);
        cart.setOrderDate(LocalDateTime.now());

        return orderRepository.save(cart);
    }

    private void recalculateTotal(Order cart) {
        BigDecimal total = cart.getItems().stream()
                .map(OrderDetail::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotal(total);
    }
}