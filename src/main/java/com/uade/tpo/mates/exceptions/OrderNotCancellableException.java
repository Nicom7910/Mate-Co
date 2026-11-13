package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Solo se pueden cancelar compras que todavía no fueron enviadas.")
public class OrderNotCancellableException extends Exception {
}