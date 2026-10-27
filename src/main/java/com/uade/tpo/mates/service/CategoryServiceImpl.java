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
import com.uade.tpo.mates.exceptions.FieldErrors;
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
        validateName(name, null);
        return categoryRepository.save(new Category(name.trim(), description));
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

        validateName(name, categoryId);

        category.setName(name.trim());
        category.setDescription(description);
        return categoryRepository.save(category);
    }

    private void validateName(String name, Long currentId) {
        FieldErrors errors = new FieldErrors()
                .requireText("name", name, "Ingresá el nombre de la categoría.");

        if (!errors.has("name")) {
            Optional<Category> existing = categoryRepository.findByName(name.trim());
            if (existing.isPresent() && !existing.get().getId().equals(currentId))
                errors.add("name", "Ya existe una categoría con ese nombre.");
        }

        errors.throwIfAny();
    }
}
