package com.uade.tpo.mates.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.mates.controllers.products.ProductRequest;
import com.uade.tpo.mates.entity.Category;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;
import com.uade.tpo.mates.exceptions.InvalidProductDataException;
import com.uade.tpo.mates.exceptions.ProductHasOrdersException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.repository.CategoryRepository;
import com.uade.tpo.mates.repository.OrderDetailRepository;
import com.uade.tpo.mates.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public Page<Product> getProducts(PageRequest pageable) {
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product createProduct(ProductRequest request) throws CategoryNotFoundException, InvalidProductDataException {
        validateProductData(request);

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .imageUrl(request.getImageUrl())
                .category(category)
                .discountPercentage(request.getDiscountPercentage())
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, ProductRequest request)
            throws ProductNotFoundException, CategoryNotFoundException, InvalidProductDataException {

        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        validateProductData(request);

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock() != null ? request.getStock() : 0);
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);
        product.setDiscountPercentage(request.getDiscountPercentage());

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) throws ProductNotFoundException, ProductHasOrdersException {
        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        if (orderDetailRepository.existsByProductId(productId))
            throw new ProductHasOrdersException();

        productRepository.delete(product);
    }

    private void validateProductData(ProductRequest request) throws InvalidProductDataException {
        if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new InvalidProductDataException();

        if (request.getStock() != null && request.getStock() < 0)
            throw new InvalidProductDataException();

        Integer discount = request.getDiscountPercentage();
        if (discount != null && (discount < 0 || discount > 100))
            throw new InvalidProductDataException();
    }
}