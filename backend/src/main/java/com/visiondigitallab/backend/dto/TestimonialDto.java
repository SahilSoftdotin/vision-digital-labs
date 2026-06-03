package com.visiondigitallab.backend.dto;

/** Mirrors the frontend Testimonial type. */
public record TestimonialDto(
        Long id,
        String name,
        String role,
        String company,
        String quote,
        int rating) {}
