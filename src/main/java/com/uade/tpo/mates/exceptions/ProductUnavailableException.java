package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Hay productos en tu carrito que ya no están disponibles. Quitalos para continuar.")
public class ProductUnavailableException extends Exception {
}
