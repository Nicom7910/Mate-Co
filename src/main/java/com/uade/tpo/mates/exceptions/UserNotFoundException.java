package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No se encontro el usuario")
public class UserNotFoundException extends Exception {
}
