package com.visiondigitallab.backend.service;

import com.visiondigitallab.backend.dto.ChatDtos;
import com.visiondigitallab.backend.service.chat.ChatProvider;
import org.springframework.stereotype.Service;

/** Thin orchestrator over the active ChatProvider (rule-based or, later, OpenAI). */
@Service
public class ChatService {

    private final ChatProvider provider;

    public ChatService(ChatProvider provider) {
        this.provider = provider;
    }

    public String reply(ChatDtos.MessageRequest request) {
        return provider.reply(request.message(), request.history());
    }
}
