package com.uade.tpo.mates.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "No pudimos guardar la imagen. Probá de nuevo en unos minutos.")
public class ImageStorageException extends Exception {
}