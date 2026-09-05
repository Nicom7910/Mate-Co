package com.uade.tpo.mates.service;

import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;

import com.uade.tpo.mates.controllers.users.UpdateProfileRequest;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.InvalidUserDataException;

public interface UserService {
    User updateProfile(User user, UpdateProfileRequest request) throws InvalidUserDataException;

    Page<User> getUsers(PageRequest pageRequest);

    Optional<User> getUserById(Long userId);
}