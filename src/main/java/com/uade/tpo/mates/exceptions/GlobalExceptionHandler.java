package com.uade.tpo.mates.exceptions;

import java.time.LocalDateTime;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
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
            ProductUnavailableException.class,
            CategoryHasProductsException.class,
            InvalidUserDataException.class,
            InvalidOrderStatusException.class,
            OrderNotCancellableException.class,
            CancellationPeriodExpiredException.class,
            InvalidImageException.class,
            ImageStorageException.class,
            OrderNotShippableException.class,
            ReviewNotAllowedException.class,
            ReviewAlreadyExistsException.class
    })
    public ResponseEntity<ErrorResponse> handleKnownExceptions(Exception ex) {
        ResponseStatus responseStatus = ex.getClass().getAnnotation(ResponseStatus.class);
        String message = ex.getMessage() != null ? ex.getMessage() : responseStatus.reason();
        return respond(responseStatus.code(), message);
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

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials() {
        return respond(HttpStatus.UNAUTHORIZED, "Email o contraseña incorrectos.");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleUnreadableBody() {
        return respond(HttpStatus.BAD_REQUEST, "Los datos enviados no tienen el formato correcto.");
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleInvalidParameter() {
        return respond(HttpStatus.BAD_REQUEST, "Uno de los valores enviados no es válido.");
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrity() {
        return respond(HttpStatus.CONFLICT,
                "No pudimos guardar los datos: alguno es demasiado largo o ya existe. Revisalos e intentá de nuevo.");
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSize() {
        return respond(HttpStatus.valueOf(413), "La imagen es demasiado grande. El máximo es 5 MB.");
    }

    private ResponseEntity<ErrorResponse> respond(HttpStatus status, String message) {
        ErrorResponse body = ErrorResponse.builder()
                .status(status.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(status).body(body);
    }
}
