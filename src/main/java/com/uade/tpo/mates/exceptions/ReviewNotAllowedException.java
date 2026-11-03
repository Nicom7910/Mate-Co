package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Solo podés reseñar productos que ya te entregamos")
public class ReviewNotAllowedException extends Exception {
}
