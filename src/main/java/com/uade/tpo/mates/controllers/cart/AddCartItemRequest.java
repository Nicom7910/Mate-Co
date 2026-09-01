package com.uade.tpo.mates.controllers.cart;

import lombok.Data;

@Data
public class AddCartItemRequest {
    private Long productId;
    private Integer quantity;
}