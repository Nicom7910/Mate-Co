package com.uade.tpo.mates.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.mates.entity.Category;
import com.uade.tpo.mates.exceptions.CategoryDuplicateException;
import com.uade.tpo.mates.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

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
}
