package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Hay productos en el carrito que ya no estan disponibles. Quitalos para continuar")
public class ProductUnavailableException extends Exception {
}
