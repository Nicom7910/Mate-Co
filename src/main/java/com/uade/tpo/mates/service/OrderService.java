package com.uade.tpo.mates.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.CancellationPeriodExpiredException;
import com.uade.tpo.mates.exceptions.OrderNotCancellableException;
import com.uade.tpo.mates.exceptions.OrderNotFoundException;
import com.uade.tpo.mates.exceptions.OrderNotShippableException;

public interface OrderService {

    Page<Order> getOrders(PageRequest pageRequest);

    Optional<Order> getOrderById(Long orderId);

    List<Order> getOrdersByUser(Long userId);

    Order cancelOrder(User user, Long orderId)
            throws OrderNotFoundException, OrderNotCancellableException, CancellationPeriodExpiredException;

    Order shipOrder(Long orderId) throws OrderNotFoundException, OrderNotShippableException;

    int deliverShippedOrders();
}