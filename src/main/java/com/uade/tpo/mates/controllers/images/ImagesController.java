package com.uade.tpo.mates.controllers.images;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.uade.tpo.mates.exceptions.ImageStorageException;
import com.uade.tpo.mates.exceptions.InvalidImageException;
import com.uade.tpo.mates.service.ImageService;

@RestController
@RequestMapping("images")
public class ImagesController {

    @Autowired
    private ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImageResponse> uploadImage(@RequestParam("file") MultipartFile file)
            throws InvalidImageException, ImageStorageException {
        String filename = imageService.store(file);
        String url = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(filename)
                .toUriString();
        return ResponseEntity.status(HttpStatus.CREATED).body(ImageResponse.builder().url(url).build());
    }
}