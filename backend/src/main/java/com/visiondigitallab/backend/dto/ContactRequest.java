package com.visiondigitallab.backend.dto;

import jakarta.validation.constraints.*;

/** Validation mirrors the frontend Zod contactSchema. */
public record ContactRequest(
        @NotBlank @Size(min = 2, message = "Please enter your name") String name,
        @NotBlank @Email(message = "Enter a valid email address") String email,
        @NotBlank(message = "Company is required") String company,
        @NotBlank @Size(min = 7, max = 25, message = "Enter a valid phone number") String phone,
        @NotBlank(message = "Select a budget range") String budget,
        @NotBlank(message = "Select a service") String service,
        @NotBlank @Size(min = 20, max = 2000, message = "Tell us a bit more (at least 20 characters)")
                String details) {}
