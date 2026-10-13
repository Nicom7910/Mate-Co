package com.uade.tpo.mates.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.uade.tpo.mates.exceptions.ImageStorageException;
import com.uade.tpo.mates.exceptions.InvalidImageException;

@Service
public class ImageServiceImpl implements ImageService {

    public static final Path UPLOAD_DIR = Path.of("uploads").toAbsolutePath();

    private static final long MAX_SIZE_BYTES = 5L * 1024 * 1024;

    private static final Map<String, String> EXTENSIONS = Map.of(
            "image/jpeg", ".jpg",
            "image/png", ".png",
            "image/webp", ".webp",
            "image/gif", ".gif");

    public String store(MultipartFile file) throws InvalidImageException, ImageStorageException {
        String type = file.getContentType();
        String extension = type == null ? null : EXTENSIONS.get(type);

        if (file.isEmpty() || extension == null || file.getSize() > MAX_SIZE_BYTES)
            throw new InvalidImageException();

        String filename = UUID.randomUUID() + extension;

        try {
            Files.createDirectories(UPLOAD_DIR);
            file.transferTo(UPLOAD_DIR.resolve(filename));
        } catch (IOException e) {
            throw new ImageStorageException();
        }

        return filename;
    }
}