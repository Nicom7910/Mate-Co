package com.uade.tpo.mates.service;

import org.springframework.web.multipart.MultipartFile;

import com.uade.tpo.mates.exceptions.ImageStorageException;
import com.uade.tpo.mates.exceptions.InvalidImageException;

public interface ImageService {

    String store(MultipartFile file) throws InvalidImageException, ImageStorageException;
}