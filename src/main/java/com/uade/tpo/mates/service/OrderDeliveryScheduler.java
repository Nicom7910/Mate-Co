package com.uade.tpo.mates.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderDeliveryScheduler {

    @Autowired
    private OrderService orderService;

    @Scheduled(initialDelay = 15000, fixedDelay = 60000)
    public void deliverShippedOrders() {
        orderService.deliverShippedOrders();
    }
}