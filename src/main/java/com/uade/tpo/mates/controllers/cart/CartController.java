package com.uade.tpo.mates.controllers.cart;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.mates.controllers.orders.OrderResponse;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.CartEmptyException;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ProductNotInCartException;
import com.uade.tpo.mates.service.CartService;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<OrderResponse> getCart(@AuthenticationPrincipal User user) {
        Optional<Order> cart = cartService.getCart(user);
        return cart.map(OrderResponse::from)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/items")
    public ResponseEntity<OrderResponse> addItem(@AuthenticationPrincipal User user,
            @RequestBody AddCartItemRequest request)
            throws ProductNotFoundException, InsufficientStockException {
        return ResponseEntity.ok(OrderResponse.from(cartService.addItem(user, request)));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<OrderResponse> updateItem(@AuthenticationPrincipal User user,
            @PathVariable Long productId,
            @RequestBody UpdateCartItemRequest request)
            throws CartEmptyException, ProductNotInCartException, InsufficientStockException {
        Order cart = cartService.updateItemQuantity(user, productId, request.getQuantity());
        return ResponseEntity.ok(OrderResponse.from(cart));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<OrderResponse> removeItem(@AuthenticationPrincipal User user,
            @PathVariable Long productId)
            throws CartEmptyException, ProductNotInCartException {
        return ResponseEntity.ok(OrderResponse.from(cartService.removeItem(user, productId)));
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@AuthenticationPrincipal User user)
            throws CartEmptyException, InsufficientStockException {
        return ResponseEntity.ok(OrderResponse.from(cartService.checkout(user)));
    }
}