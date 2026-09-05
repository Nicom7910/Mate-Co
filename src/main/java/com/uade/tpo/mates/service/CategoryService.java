package com.uade.tpo.mates.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.mates.entity.Category;
import com.uade.tpo.mates.exceptions.CategoryDuplicateException;
import com.uade.tpo.mates.exceptions.CategoryHasProductsException;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;

public interface CategoryService {

    Page<Category> getCategories(PageRequest pageRequest);

    Optional<Category> getCategoryById(Long categoryId);

    Category createCategory(String name, String description) throws CategoryDuplicateException;

    void deleteCategory(Long categoryId) throws CategoryNotFoundException, CategoryHasProductsException;

    Category updateCategory(Long categoryId, String name, String description)
            throws CategoryNotFoundException, CategoryDuplicateException;
}
