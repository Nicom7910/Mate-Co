package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Solo se puede marcar como enviado un pedido que esta pagado")
public class OrderNotShippableException extends Exception {
}