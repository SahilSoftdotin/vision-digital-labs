package com.visiondigitallab.backend.web;

import com.visiondigitallab.backend.domain.User;
import com.visiondigitallab.backend.dto.AuthDtos.*;
import com.visiondigitallab.backend.mapper.EntityMapper;
import com.visiondigitallab.backend.repository.UserRepository;
import com.visiondigitallab.backend.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/** Authentication: login + current user. */
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "Authentication")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository users;

    public AuthController(
            AuthenticationManager authManager, JwtService jwtService, UserRepository users) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.users = users;
    }

    @PostMapping("/login")
    @Operation(summary = "Log in and receive a JWT")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        // Throws BadCredentialsException (→ 401) on failure, handled globally.
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = users.findByEmail(request.email()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new LoginResponse(token, jwtService.getExpirationMs(), EntityMapper.toDto(user));
    }

    @GetMapping("/me")
    @Operation(summary = "Get the currently authenticated user")
    public UserDto me(@AuthenticationPrincipal UserDetails principal) {
        User user = users.findByEmail(principal.getUsername()).orElseThrow();
        return EntityMapper.toDto(user);
    }
}
