package com.visiondigitallab.backend.service;

import com.visiondigitallab.backend.domain.*;
import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.repository.*;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Write-side service for inbound leads: contacts, consultations, chat leads. */
@Service
@Transactional
public class LeadService {

    private final ContactRepository contactRepo;
    private final ConsultationRepository consultationRepo;
    private final ChatLeadRepository chatLeadRepo;

    public LeadService(
            ContactRepository contactRepo,
            ConsultationRepository consultationRepo,
            ChatLeadRepository chatLeadRepo) {
        this.contactRepo = contactRepo;
        this.consultationRepo = consultationRepo;
        this.chatLeadRepo = chatLeadRepo;
    }

    public Contact createContact(ContactRequest r) {
        Contact c =
                Contact.builder()
                        .name(r.name())
                        .email(r.email())
                        .company(r.company())
                        .phone(r.phone())
                        .budget(r.budget())
                        .service(r.service())
                        .details(r.details())
                        .build();
        return contactRepo.save(c);
    }

    public Consultation createConsultation(ConsultationRequest r, String source) {
        Consultation c =
                Consultation.builder()
                        .name(r.name())
                        .email(r.email())
                        .company(r.company())
                        .date(r.date())
                        .time(r.time())
                        .notes(r.notes())
                        .source(source)
                        .build();
        return consultationRepo.save(c);
    }

    public ChatLead createChatLead(ChatDtos.LeadRequest r) {
        ChatLead lead =
                ChatLead.builder().name(r.name()).email(r.email()).interest(r.interest()).build();
        return chatLeadRepo.save(lead);
    }

    @Transactional(readOnly = true)
    public List<Contact> listContacts() {
        return contactRepo.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Consultation> listConsultations() {
        return consultationRepo.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<ChatLead> listChatLeads() {
        return chatLeadRepo.findAllByOrderByCreatedAtDesc();
    }
}
