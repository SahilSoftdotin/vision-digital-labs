package com.visiondigitallab.backend.dto;

import java.util.List;

/** Mirrors the frontend CaseStudy type exactly. */
public record CaseStudyDto(
        Long id,
        String slug,
        String title,
        String client,
        String industry,
        String summary,
        String cover,
        String challenge,
        String solution,
        List<String> technologies,
        String timeline,
        List<ResultDto> results,
        List<String> tags,
        boolean featured) {

    public record ResultDto(String label, String value) {}
}
