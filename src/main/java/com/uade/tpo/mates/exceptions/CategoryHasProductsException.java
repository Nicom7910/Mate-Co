package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "No se puede eliminar la categoría porque todavía tiene productos asociados.")
public class CategoryHasProductsException extends Exception {
}