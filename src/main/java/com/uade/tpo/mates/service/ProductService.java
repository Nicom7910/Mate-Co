package com.uade.tpo.mates.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.controllers.products.ProductRequest;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;
import com.uade.tpo.mates.exceptions.InvalidProductDataException;
import com.uade.tpo.mates.exceptions.ProductHasOrdersException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;

public interface ProductService {

    Page<Product> getProducts(PageRequest pageRequest);

    Optional<Product> getProductById(Long productId);

    List<Product> getProductsByCategory(Long categoryId);

    Product createProduct(ProductRequest request) throws CategoryNotFoundException, InvalidProductDataException;

    Product updateProduct(Long productId, ProductRequest request)
            throws ProductNotFoundException, CategoryNotFoundException, InvalidProductDataException;

    void deleteProduct(Long productId) throws ProductNotFoundException, ProductHasOrdersException;
}