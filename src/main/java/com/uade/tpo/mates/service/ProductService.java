package com.uade.tpo.mates.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.controllers.products.ProductRequest;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;

public interface ProductService {

    Page<Product> getProducts(PageRequest pageRequest);

    Optional<Product> getProductById(Long productId);

    List<Product> getProductsByCategory(Long categoryId);

    Product createProduct(ProductRequest request) throws CategoryNotFoundException;
}
