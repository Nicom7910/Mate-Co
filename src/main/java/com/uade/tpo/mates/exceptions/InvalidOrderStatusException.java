package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Desde el carrito solo se puede confirmar la compra.")
public class InvalidOrderStatusException extends Exception {
}