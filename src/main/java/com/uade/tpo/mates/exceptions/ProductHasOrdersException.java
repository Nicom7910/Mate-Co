package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "No se puede eliminar un producto que ya tiene compras u ordenes asociadas")
public class ProductHasOrdersException extends Exception {
}