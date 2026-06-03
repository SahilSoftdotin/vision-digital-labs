package com.visiondigitallab.backend.dto;

/** Generic success envelope for POST endpoints. id is nullable. */
public record ApiResponse(String message, Long id) {
    public static ApiResponse of(String message) {
        return new ApiResponse(message, null);
    }

    public static ApiResponse of(String message, Long id) {
        return new ApiResponse(message, id);
    }
}
