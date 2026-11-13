package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Nombre, apellido, teléfono y dirección son obligatorios.")
public class InvalidUserDataException extends Exception {
}