package com.uade.tpo.mates.controllers.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.uade.tpo.mates.service.ImageServiceImpl;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = ImageServiceImpl.UPLOAD_DIR.toUri().toString();
        if (!location.endsWith("/"))
            location += "/";

        registry.addResourceHandler("/uploads/**").addResourceLocations(location);
    }
}