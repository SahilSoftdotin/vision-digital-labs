package com.visiondigitallab.backend.service.chat;

import com.visiondigitallab.backend.dto.ChatDtos.ChatTurn;
import java.util.List;

/**
 * Strategy interface for chat backends. A rule-based provider ships now; an
 * OpenAI (or other) provider can be added by implementing this and marking it
 * {@code @Primary}. Call sites never change.
 */
public interface ChatProvider {
    String reply(String message, List<ChatTurn> history);
}
