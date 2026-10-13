package com.uade.tpo.mates.service;

import java.time.DayOfWeek;
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
import com.uade.tpo.mates.repository.OrderRepository;
import com.uade.tpo.mates.repository.ProductRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int CANCELLATION_BUSINESS_DAYS = 15;

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

    private boolean isInCancellationPeriod(LocalDateTime orderDate) {
        LocalDate lastDay = orderDate.toLocalDate();
        int added = 0;

        while (added < CANCELLATION_BUSINESS_DAYS) {
            lastDay = lastDay.plusDays(1);
            DayOfWeek day = lastDay.getDayOfWeek();
            if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY)
                added++;
        }

        return !LocalDate.now().isAfter(lastDay);
    }
}