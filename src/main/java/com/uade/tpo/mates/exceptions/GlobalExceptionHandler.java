package com.uade.tpo.mates.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            CategoryDuplicateException.class,
            CategoryNotFoundException.class,
            ProductNotFoundException.class,
            OrderNotFoundException.class,
            InsufficientStockException.class,
            UserNotFoundException.class,
            UserAlreadyExistsException.class,
            CartEmptyException.class,
            ProductNotInCartException.class,
            InvalidQuantityException.class,
            InvalidProductDataException.class,
            ProductHasOrdersException.class,
            CategoryHasProductsException.class,
            InvalidUserDataException.class,
            InvalidOrderStatusException.class,
            OrderNotCancellableException.class,
            CancellationPeriodExpiredException.class,
            InvalidImageException.class,
            ImageStorageException.class,
            OrderNotShippableException.class
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

    @ExceptionHandler(InvalidFieldsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidFields(InvalidFieldsException ex) {
        ErrorResponse body = ErrorResponse.builder()
                .status(400)
                .message(ex.getMessage())
                .errors(ex.getErrors())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSize() {
        ErrorResponse body = ErrorResponse.builder()
                .status(413)
                .message("La imagen es demasiado grande (maximo 5 MB)")
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(413).body(body);
    }
}