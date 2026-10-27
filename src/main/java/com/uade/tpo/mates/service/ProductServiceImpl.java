package com.uade.tpo.mates.service;

import java.math.BigDecimal;
import java.util.ArrayList;
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
import com.uade.tpo.mates.exceptions.FieldErrors;
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

    public Page<Product> getProducts(PageRequest pageable, boolean includeInactive) {
        return includeInactive
                ? productRepository.findAll(pageable)
                : productRepository.findByActiveTrue(pageable);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryIdAndActiveTrue(categoryId);
    }

    public Product createProduct(ProductRequest request) throws CategoryNotFoundException, InvalidProductDataException {
        validateProductData(request);

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        List<String> imageUrls = resolveImageUrls(request);

        Product product = Product.builder()
                .name(request.getName().trim())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .imageUrl(imageUrls.isEmpty() ? null : imageUrls.get(0))
                .imageUrls(imageUrls)
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

        product.setName(request.getName().trim());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock() != null ? request.getStock() : 0);
        List<String> imageUrls = resolveImageUrls(request);
        product.setImageUrl(imageUrls.isEmpty() ? null : imageUrls.get(0));
        product.getImageUrls().clear();
        product.getImageUrls().addAll(imageUrls);
        product.setCategory(category);
        product.setDiscountPercentage(request.getDiscountPercentage());

        return productRepository.save(product);
    }

    public Product updateStatus(Long productId, boolean active) throws ProductNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        product.setActive(active);
        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) throws ProductNotFoundException, ProductHasOrdersException {
        Product product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        if (orderDetailRepository.existsByProductId(productId))
            throw new ProductHasOrdersException();

        productRepository.delete(product);
    }

    private void validateProductData(ProductRequest request) {
        FieldErrors errors = new FieldErrors()
                .requireText("name", request.getName(), "Ingresá el nombre del producto.");

        if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0)
            errors.add("price", "Ingresá un precio mayor a 0.");

        if (request.getStock() != null && request.getStock() < 0)
            errors.add("stock", "El stock no puede ser negativo.");

        Integer discount = request.getDiscountPercentage();
        if (discount != null && (discount < 0 || discount > 100))
            errors.add("discountPercentage", "El descuento tiene que estar entre 0 y 100.");

        if (request.getCategoryId() == null)
            errors.add("categoryId", "Elegí una categoría.");

        if (resolveImageUrls(request).isEmpty())
            errors.add("imageUrls", "Subí al menos una foto del producto.");

        errors.throwIfAny();
    }

    private List<String> resolveImageUrls(ProductRequest request) {
        List<String> urls = new ArrayList<>();

        if (request.getImageUrls() != null) {
            for (String url : request.getImageUrls()) {
                if (url != null && !url.isBlank())
                    urls.add(url.trim());
            }
        } else if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            urls.add(request.getImageUrl().trim());
        }

        return urls;
    }
}
