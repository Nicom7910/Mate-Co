package com.uade.tpo.mates.controllers.orders;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Long productId;
    private Integer quantity;
}
