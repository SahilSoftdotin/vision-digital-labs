package com.visiondigitallab.backend.web;

import com.visiondigitallab.backend.domain.Consultation;
import com.visiondigitallab.backend.domain.Contact;
import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.service.ChatService;
import com.visiondigitallab.backend.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Public submission endpoints: contact, consultation, and chatbot. */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Leads", description = "Inbound contact, consultation and chat")
public class LeadController {

    private final LeadService leads;
    private final ChatService chat;

    public LeadController(LeadService leads, ChatService chat) {
        this.leads = leads;
        this.chat = chat;
    }

    @PostMapping("/contact")
    @Operation(summary = "Submit the contact form")
    public ResponseEntity<ApiResponse> contact(@Valid @RequestBody ContactRequest request) {
        Contact saved = leads.createContact(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.of(
                                "Thanks! We'll be in touch within one business day.", saved.getId()));
    }

    @PostMapping("/consultation")
    @Operation(summary = "Book a consultation")
    public ResponseEntity<ApiResponse> consultation(
            @Valid @RequestBody ConsultationRequest request) {
        Consultation saved = leads.createConsultation(request, "web");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Consultation booked.", saved.getId()));
    }

    @PostMapping("/chat/message")
    @Operation(summary = "Send a message to the assistant")
    public ChatDtos.MessageResponse chatMessage(
            @Valid @RequestBody ChatDtos.MessageRequest request) {
        return new ChatDtos.MessageResponse(chat.reply(request));
    }

    @PostMapping("/chat/lead")
    @Operation(summary = "Capture a lead from the chatbot")
    public ResponseEntity<ApiResponse> chatLead(@Valid @RequestBody ChatDtos.LeadRequest request) {
        var saved = leads.createChatLead(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Thanks! A strategist will reach out shortly.", saved.getId()));
    }

    @PostMapping("/chat/book-call")
    @Operation(summary = "Book a call via the chatbot")
    public ResponseEntity<ApiResponse> chatBookCall(
            @Valid @RequestBody ConsultationRequest request) {
        Consultation saved = leads.createConsultation(request, "chat");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Call booked via assistant.", saved.getId()));
    }
}
