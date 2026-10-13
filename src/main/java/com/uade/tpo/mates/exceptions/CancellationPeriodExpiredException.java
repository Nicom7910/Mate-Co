package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Paso el plazo de 15 dias habiles para cancelar la compra")
public class CancellationPeriodExpiredException extends Exception {
}