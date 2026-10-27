package com.uade.tpo.mates.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uade.tpo.mates.controllers.auth.AuthenticationRequest;
import com.uade.tpo.mates.controllers.auth.AuthenticationResponse;
import com.uade.tpo.mates.controllers.auth.RegisterRequest;
import com.uade.tpo.mates.controllers.config.JwtService;
import com.uade.tpo.mates.entity.Role;
import com.uade.tpo.mates.entity.User;
import com.uade.tpo.mates.exceptions.FieldErrors;
import com.uade.tpo.mates.exceptions.UserAlreadyExistsException;
import com.uade.tpo.mates.repository.UserRepository;
import com.uade.tpo.mates.exceptions.InvalidUserDataException;

import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final int MIN_PASSWORD_LENGTH = 8;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request)
            throws UserAlreadyExistsException, InvalidUserDataException {
        FieldErrors errors = new FieldErrors()
                .requireText("name", request.getName(), "Ingresá tu nombre.")
                .requireText("lastName", request.getLastName(), "Ingresá tu apellido.")
                .requireText("username", request.getUsername(), "Ingresá un nombre de usuario.")
                .requireText("email", request.getEmail(), "Ingresá tu email.")
                .requirePhone(request.getPhone())
                .requireText("address", request.getAddress(), "Ingresá tu dirección.");

        if (!errors.has("email") && !EMAIL_PATTERN.matcher(request.getEmail().trim()).matches())
            errors.add("email", "Ingresá un email válido, por ejemplo nombre@mail.com.");

        if (request.getPassword() == null || request.getPassword().length() < MIN_PASSWORD_LENGTH)
            errors.add("password", "La contraseña debe tener al menos " + MIN_PASSWORD_LENGTH + " caracteres.");

        if (!errors.has("email") && repository.existsByEmail(request.getEmail().trim()))
            errors.add("email", "Ya existe una cuenta con ese email.");

        if (!errors.has("username") && repository.existsByUsername(request.getUsername().trim()))
            errors.add("username", "Ese nombre de usuario ya está en uso.");

        errors.throwIfAny();

        var user = new User();
        user.setUsername(request.getUsername().trim());
        user.setName(request.getName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone().trim());
        user.setAddress(request.getAddress().trim());
        user.setRole(Role.USER);

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
}
