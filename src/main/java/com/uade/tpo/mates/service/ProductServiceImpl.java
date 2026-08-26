package com.uade.tpo.mates.service;

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
import com.uade.tpo.mates.repository.CategoryRepository;
import com.uade.tpo.mates.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<Product> getProducts(PageRequest pageable) {
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product createProduct(ProductRequest request) throws CategoryNotFoundException {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        return productRepository.save(product);
    }
}
