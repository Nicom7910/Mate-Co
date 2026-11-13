package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Ya pasó el plazo de 15 días hábiles para cancelar esta compra.")
public class CancellationPeriodExpiredException extends Exception {
}