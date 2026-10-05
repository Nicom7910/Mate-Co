package com.uade.tpo.mates.controllers.cart;

import com.uade.tpo.mates.entity.OrderStatus;

import lombok.Data;

@Data
public class UpdateCartStatusRequest {
    private OrderStatus status;
}