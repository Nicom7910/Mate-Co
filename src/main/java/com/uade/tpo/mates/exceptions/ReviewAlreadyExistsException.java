package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Ya reseñaste este producto")
public class ReviewAlreadyExistsException extends Exception {
}
