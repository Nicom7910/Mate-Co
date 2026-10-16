package com.uade.tpo.mates.controllers.products;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private List<String> imageUrls;
    private Long categoryId;
    private Integer discountPercentage;
}