package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Ya existe una categoria con ese nombre")
public class CategoryDuplicateException extends Exception {
}
