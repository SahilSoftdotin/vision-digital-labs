package com.visiondigitallab.backend.web;

import com.visiondigitallab.backend.domain.*;
import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.service.AdminContentService;
import com.visiondigitallab.backend.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/** Protected admin endpoints (JWT required). Deletes require ADMIN role. */
@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin", description = "Protected management endpoints")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final LeadService leads;
    private final AdminContentService admin;

    public AdminController(LeadService leads, AdminContentService admin) {
        this.leads = leads;
        this.admin = admin;
    }

    // ---- Leads (read) ------------------------------------------------------

    @GetMapping("/contacts")
    @Operation(summary = "List contact submissions")
    public List<Contact> contacts() {
        return leads.listContacts();
    }

    @GetMapping("/consultations")
    @Operation(summary = "List consultation bookings")
    public List<Consultation> consultations() {
        return leads.listConsultations();
    }

    @GetMapping("/chat-leads")
    @Operation(summary = "List chatbot-captured leads")
    public List<ChatLead> chatLeads() {
        return leads.listChatLeads();
    }

    // ---- Services ----------------------------------------------------------

    @PostMapping("/services")
    @Operation(summary = "Create a service")
    public ResponseEntity<ServiceDto> createService(@RequestBody ServiceDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(admin.saveService(null, dto));
    }

    @PutMapping("/services/{id}")
    @Operation(summary = "Update a service")
    public ServiceDto updateService(@PathVariable Long id, @RequestBody ServiceDto dto) {
        return admin.saveService(id, dto);
    }

    @DeleteMapping("/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a service (ADMIN only)")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        admin.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    // ---- Case studies ------------------------------------------------------

    @PostMapping("/casestudies")
    @Operation(summary = "Create a case study")
    public ResponseEntity<CaseStudyDto> createCase(@RequestBody CaseStudyDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(admin.saveCaseStudy(null, dto));
    }

    @PutMapping("/casestudies/{id}")
    @Operation(summary = "Update a case study")
    public CaseStudyDto updateCase(@PathVariable Long id, @RequestBody CaseStudyDto dto) {
        return admin.saveCaseStudy(id, dto);
    }

    @DeleteMapping("/casestudies/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a case study (ADMIN only)")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        admin.deleteCaseStudy(id);
        return ResponseEntity.noContent().build();
    }

    // ---- Testimonials ------------------------------------------------------

    @PostMapping("/testimonials")
    @Operation(summary = "Create a testimonial")
    public ResponseEntity<TestimonialDto> createTestimonial(@Valid @RequestBody TestimonialDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(admin.saveTestimonial(null, dto));
    }

    @PutMapping("/testimonials/{id}")
    @Operation(summary = "Update a testimonial")
    public TestimonialDto updateTestimonial(
            @PathVariable Long id, @Valid @RequestBody TestimonialDto dto) {
        return admin.saveTestimonial(id, dto);
    }

    @DeleteMapping("/testimonials/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a testimonial (ADMIN only)")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        admin.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}
