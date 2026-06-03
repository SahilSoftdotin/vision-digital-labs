package com.visiondigitallab.backend.dto;

import java.util.List;

/** Mirrors the frontend Service type exactly. */
public record ServiceDto(
        Long id,
        String slug,
        String title,
        String icon,
        String tagline,
        String description,
        List<String> features,
        List<String> deliverables,
        List<String> relatedCaseStudies) {}
