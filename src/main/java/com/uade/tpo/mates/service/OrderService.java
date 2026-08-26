package com.uade.tpo.mates.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.controllers.orders.OrderRequest;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.UserNotFoundException;

public interface OrderService {

    Page<Order> getOrders(PageRequest pageRequest);

    Optional<Order> getOrderById(Long orderId);

    List<Order> getOrdersByUser(Long userId);

    Order createOrder(OrderRequest request)
            throws UserNotFoundException, ProductNotFoundException, InsufficientStockException;
}
