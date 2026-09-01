package com.uade.tpo.mates.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            CategoryDuplicateException.class,
            CategoryNotFoundException.class,
            ProductNotFoundException.class,
            InsufficientStockException.class,
            UserNotFoundException.class,
            UserAlreadyExistsException.class,
            CartEmptyException.class,
            ProductNotInCartException.class,
            OrderNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleKnownExceptions(Exception ex) {
        ResponseStatus responseStatus = ex.getClass().getAnnotation(ResponseStatus.class);
        HttpStatus status = responseStatus.code();
        String message = responseStatus.reason();

        ErrorResponse body = ErrorResponse.builder()
                .status(status.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(status).body(body);
    }
}