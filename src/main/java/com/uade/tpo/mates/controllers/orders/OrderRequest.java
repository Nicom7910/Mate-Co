package com.uade.tpo.mates.controllers.orders;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {

    private Long userId;
    private List<OrderItemRequest> items;
}
