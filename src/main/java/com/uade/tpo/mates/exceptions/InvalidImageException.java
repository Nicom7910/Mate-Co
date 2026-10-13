package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "La imagen tiene que ser JPG, PNG, WEBP o GIF y pesar hasta 5 MB")
public class InvalidImageException extends Exception {
}