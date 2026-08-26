package com.uade.tpo.mates.controllers.orders;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.UserNotFoundException;
import com.uade.tpo.mates.service.OrderService;

@RestController
@RequestMapping("orders")
public class OrdersController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<Order>> getOrders(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(orderService.getOrders(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(orderService.getOrders(PageRequest.of(page, size)));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Optional<Order> result = orderService.getOrderById(orderId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestBody OrderRequest orderRequest)
            throws UserNotFoundException, ProductNotFoundException, InsufficientStockException {
        Order result = orderService.createOrder(orderRequest);
        return ResponseEntity.created(URI.create("/orders/" + result.getId())).body(result);
    }
}
