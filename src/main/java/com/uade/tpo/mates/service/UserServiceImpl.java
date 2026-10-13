package com.uade.tpo.mates.service;

import java.util.Optional;
import org.springframework.util.StringUtils;

import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.mates.controllers.users.UpdateProfileRequest;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.InvalidUserDataException;
import com.uade.tpo.mates.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateProfile(User user, UpdateProfileRequest request) throws InvalidUserDataException {
        if (!StringUtils.hasText(request.getName()) || !StringUtils.hasText(request.getLastName())
                || !StringUtils.hasText(request.getPhone()) || !StringUtils.hasText(request.getAddress()))
            throw new InvalidUserDataException();

        user.setName(request.getName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        return userRepository.save(user);
    }

    public Page<User> getUsers(PageRequest pageable) {
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}