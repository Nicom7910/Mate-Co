package com.uade.tpo.mates.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.mates.entity.Category;
import com.uade.tpo.mates.exceptions.CategoryDuplicateException;
import com.uade.tpo.mates.exceptions.CategoryHasProductsException;
import com.uade.tpo.mates.exceptions.CategoryNotFoundException;
import com.uade.tpo.mates.repository.CategoryRepository;
import com.uade.tpo.mates.repository.ProductRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public Page<Category> getCategories(PageRequest pageable) {
        return categoryRepository.findAll(pageable);
    }

    public Optional<Category> getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category createCategory(String name, String description) throws CategoryDuplicateException {
        if (categoryRepository.findByName(name).isPresent())
            throw new CategoryDuplicateException();
        return categoryRepository.save(new Category(name, description));
    }

    public void deleteCategory(Long categoryId) throws CategoryNotFoundException, CategoryHasProductsException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(CategoryNotFoundException::new);

        if (productRepository.existsByCategoryId(categoryId))
            throw new CategoryHasProductsException();

        categoryRepository.delete(category);
    }

    public Category updateCategory(Long categoryId, String name, String description)
            throws CategoryNotFoundException, CategoryDuplicateException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(CategoryNotFoundException::new);

        Optional<Category> existing = categoryRepository.findByName(name);
        if (existing.isPresent() && !existing.get().getId().equals(categoryId))
            throw new CategoryDuplicateException();

        category.setName(name);
        category.setDescription(description);
        return categoryRepository.save(category);
    }
}