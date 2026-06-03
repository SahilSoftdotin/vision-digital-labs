package com.visiondigitallab.backend.dto;

import com.visiondigitallab.backend.domain.Role;
import jakarta.validation.constraints.*;

/** Authentication request/response DTOs. */
public final class AuthDtos {
    private AuthDtos() {}

    public record LoginRequest(
            @NotBlank @Email String email, @NotBlank String password) {}

    public record UserDto(Long id, String name, String email, Role role) {}

    public record LoginResponse(String token, long expiresInMs, UserDto user) {}
}
