package com.uade.tpo.mates.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    Optional<Order> findByUserIdAndStatus(Long userId, OrderStatus status);
}