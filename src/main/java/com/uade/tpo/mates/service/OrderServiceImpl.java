package com.uade.tpo.mates.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.mates.controllers.orders.OrderItemRequest;
import com.uade.tpo.mates.controllers.orders.OrderRequest;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.OrderDetail;
import com.uade.tpo.mates.entity.OrderStatus;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.UserNotFoundException;
import com.uade.tpo.mates.repository.OrderRepository;
import com.uade.tpo.mates.repository.ProductRepository;
import com.uade.tpo.mates.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<Order> getOrders(PageRequest pageable) {
        return orderRepository.findAll(pageable);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Transactional
    public Order createOrder(OrderRequest request)
            throws UserNotFoundException, ProductNotFoundException, InsufficientStockException {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(UserNotFoundException::new);

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(ProductNotFoundException::new);

            if (product.getStock() < itemRequest.getQuantity())
                throw new InsufficientStockException();

            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);

            OrderDetail detail = OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(product.getPrice())
                    .build();

            order.getItems().add(detail);
            total = total.add(detail.getSubtotal());
        }

        order.setTotal(total);

        return orderRepository.save(order);
    }
}
