package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "El precio debe ser mayor a cero y el stock no puede ser negativo")
public class InvalidProductDataException extends Exception {
}