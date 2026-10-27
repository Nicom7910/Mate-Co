package com.uade.tpo.mates.controllers.products;

import lombok.Data;

@Data
public class ProductStatusRequest {
    // true = activo (visible y comprable), false = dado de baja
    private Boolean active;
}
