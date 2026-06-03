package com.visiondigitallab.backend.dto;

import jakarta.validation.constraints.*;

/** Validation mirrors the frontend Zod consultationSchema. */
public record ConsultationRequest(
        @NotBlank @Size(min = 2, message = "Please enter your name") String name,
        @NotBlank @Email(message = "Enter a valid email address") String email,
        String company,
        @NotBlank(message = "Pick a date") String date,
        @NotBlank(message = "Pick a time") String time,
        @Size(max = 1000) String notes) {}
