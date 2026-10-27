package com.uade.tpo.mates.controllers.products;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.mates.controllers.MessageResponse;
import com.uade.tpo.mates.entity.Product;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;
import com.uade.tpo.mates.exceptions.FieldErrors;
import com.uade.tpo.mates.exceptions.InvalidProductDataException;
import com.uade.tpo.mates.exceptions.ProductHasOrdersException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.service.ProductService;

@RestController
@RequestMapping("products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    // Público: solo productos activos. El admin puede pedir todos con ?includeInactive=true.
    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Boolean includeInactive,
            Authentication authentication) {
        boolean all = Boolean.TRUE.equals(includeInactive) && isAdmin(authentication);
        PageRequest pageRequest = (page == null || size == null)
                ? PageRequest.of(0, Integer.MAX_VALUE)
                : PageRequest.of(page, size);
        return ResponseEntity.ok(productService.getProducts(pageRequest, all));
    }

    // Un producto inactivo solo lo puede ver el admin (para reactivarlo o editarlo).
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId, Authentication authentication)
            throws ProductNotFoundException {
        Product product = productService.getProductById(productId)
                .orElseThrow(ProductNotFoundException::new);
        if (!product.isActive() && !isAdmin(authentication))
            throw new ProductNotFoundException();
        return ResponseEntity.ok(product);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody ProductRequest productRequest)
            throws CategoryNotFoundException, InvalidProductDataException {
        Product result = productService.createProduct(productRequest);
        return ResponseEntity.created(URI.create("/products/" + result.getId())).body(result);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,
            @RequestBody ProductRequest productRequest)
            throws ProductNotFoundException, CategoryNotFoundException, InvalidProductDataException {
        Product result = productService.updateProduct(productId, productRequest);
        return ResponseEntity.ok(result);
    }

    // Baja lógica: { "active": false } desactiva, { "active": true } reactiva.
    @PatchMapping("/{productId}/status")
    public ResponseEntity<Product> updateStatus(@PathVariable Long productId,
            @RequestBody ProductStatusRequest request) throws ProductNotFoundException {
        new FieldErrors()
                .require(request.getActive() != null, "active", "Indicá si el producto queda activo o inactivo.")
                .throwIfAny();
        return ResponseEntity.ok(productService.updateStatus(productId, request.getActive()));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<MessageResponse> deleteProduct(@PathVariable Long productId)
            throws ProductNotFoundException, ProductHasOrdersException {
        productService.deleteProduct(productId);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Producto eliminado con exito")
                .build());
    }

    private boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> "ADMIN".equals(authority.getAuthority()));
    }
}