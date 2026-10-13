package com.uade.tpo.mates.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.OrderDetail;
import com.uade.tpo.mates.entity.OrderStatus;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.CancellationPeriodExpiredException;
import com.uade.tpo.mates.exceptions.OrderNotCancellableException;
import com.uade.tpo.mates.exceptions.OrderNotFoundException;
import com.uade.tpo.mates.exceptions.OrderNotShippableException;
import com.uade.tpo.mates.repository.OrderRepository;
import com.uade.tpo.mates.repository.ProductRepository;
import com.uade.tpo.mates.util.BusinessDays;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int CANCELLATION_BUSINESS_DAYS = 15;

    private static final int DELIVERY_BUSINESS_DAYS = 3;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Page<Order> getOrders(PageRequest pageable) {
        return orderRepository.findAll(pageable);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order cancelOrder(User user, Long orderId)
            throws OrderNotFoundException, OrderNotCancellableException, CancellationPeriodExpiredException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(OrderNotFoundException::new);

        if (!order.getUser().getId().equals(user.getId()))
            throw new OrderNotFoundException();

        if (order.getStatus() != OrderStatus.PAID)
            throw new OrderNotCancellableException();

        if (!isInCancellationPeriod(order.getOrderDate()))
            throw new CancellationPeriodExpiredException();

        for (OrderDetail item : order.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Transactional(rollbackFor = Exception.class)
    public Order shipOrder(Long orderId) throws OrderNotFoundException, OrderNotShippableException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(OrderNotFoundException::new);

        if (order.getStatus() != OrderStatus.PAID)
            throw new OrderNotShippableException();

        order.setStatus(OrderStatus.SHIPPED);
        order.setShippedDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Transactional
    public int deliverShippedOrders() {
        List<Order> delivered = orderRepository.findByStatus(OrderStatus.SHIPPED).stream()
                .filter(order -> order.getShippedDate() != null && isDeliveryDue(order.getShippedDate()))
                .toList();

        delivered.forEach(order -> order.setStatus(OrderStatus.DELIVERED));
        orderRepository.saveAll(delivered);
        return delivered.size();
    }

    private boolean isInCancellationPeriod(LocalDateTime orderDate) {
        LocalDate lastDay = BusinessDays.add(orderDate.toLocalDate(), CANCELLATION_BUSINESS_DAYS);
        return !LocalDate.now().isAfter(lastDay);
    }

    private boolean isDeliveryDue(LocalDateTime shippedDate) {
        LocalDate deliveryDay = BusinessDays.add(shippedDate.toLocalDate(), DELIVERY_BUSINESS_DAYS);
        return !LocalDate.now().isBefore(deliveryDay);
    }
}