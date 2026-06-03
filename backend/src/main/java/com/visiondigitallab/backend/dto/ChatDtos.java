package com.visiondigitallab.backend.dto;

import jakarta.validation.constraints.*;
import java.util.List;

/** Chat-related request/response DTOs grouped together. */
public final class ChatDtos {
    private ChatDtos() {}

    public record ChatTurn(String role, String content) {}

    public record MessageRequest(
            @NotBlank @Size(max = 1000) String message, List<ChatTurn> history) {}

    public record MessageResponse(String reply) {}

    public record LeadRequest(
            @NotBlank @Size(min = 2) String name,
            @NotBlank @Email String email,
            String interest) {}
}
