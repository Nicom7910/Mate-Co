package com.uade.tpo.mates.service;

import java.util.Optional;

import com.uade.tpo.mates.controllers.cart.AddCartItemRequest;
import com.uade.tpo.mates.entity.Order;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.CartEmptyException;
import com.uade.tpo.mates.exceptions.InsufficientStockException;
import com.uade.tpo.mates.exceptions.InvalidQuantityException;
import com.uade.tpo.mates.exceptions.ProductNotFoundException;
import com.uade.tpo.mates.exceptions.ProductNotInCartException;

public interface CartService {

        Optional<Order> getCart(User user);

        Order addItem(User user, AddCartItemRequest request)
                        throws ProductNotFoundException, InsufficientStockException, InvalidQuantityException;

        Order updateItemQuantity(User user, Long productId, Integer quantity)
                        throws CartEmptyException, ProductNotInCartException, InsufficientStockException;

        Order removeItem(User user, Long productId)
                        throws CartEmptyException, ProductNotInCartException;

        Order checkout(User user) throws CartEmptyException, InsufficientStockException;
}