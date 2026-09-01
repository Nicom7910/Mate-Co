package com.uade.tpo.mates.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.entity.Order;

public interface OrderService {

    Page<Order> getOrders(PageRequest pageRequest);

    Optional<Order> getOrderById(Long orderId);

    List<Order> getOrdersByUser(Long userId);
}