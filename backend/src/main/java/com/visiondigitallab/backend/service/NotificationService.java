package com.visiondigitallab.backend.service;

import com.visiondigitallab.backend.domain.Consultation;
import com.visiondigitallab.backend.domain.Contact;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Sends email notifications for new inbound leads. Async + fail-safe: a slow or
 * misconfigured mail server never blocks or breaks the public form submission.
 * No-ops cleanly when notifications are disabled or no mail sender is configured.
 */
@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${app.notify.enabled:false}")
    private boolean enabled;

    @Value("${app.notify.to:}")
    private String to;

    @Value("${app.notify.from:}")
    private String from;

    public NotificationService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    @Async
    public void notifyNewContact(Contact c) {
        String body =
                """
                New contact form submission:

                Name:    %s
                Email:   %s
                Company: %s
                Phone:   %s
                Budget:  %s
                Service: %s

                Details:
                %s

                — Vision Digital Lab
                """
                        .formatted(
                                c.getName(),
                                c.getEmail(),
                                c.getCompany(),
                                c.getPhone(),
                                c.getBudget(),
                                c.getService(),
                                c.getDetails());
        send("New contact: " + c.getName() + " — " + c.getService(), body, c.getEmail());
    }

    @Async
    public void notifyNewConsultation(Consultation c) {
        String body =
                """
                New consultation booking:

                Name:    %s
                Email:   %s
                Company: %s
                Date:    %s
                Time:    %s
                Source:  %s

                Notes:
                %s

                — Vision Digital Lab
                """
                        .formatted(
                                c.getName(),
                                c.getEmail(),
                                c.getCompany() == null ? "—" : c.getCompany(),
                                c.getDate(),
                                c.getTime(),
                                c.getSource(),
                                c.getNotes() == null ? "—" : c.getNotes());
        send("New consultation: " + c.getName() + " (" + c.getDate() + " " + c.getTime() + ")", body, c.getEmail());
    }

    private void send(String subject, String body, String replyTo) {
        if (!enabled || to == null || to.isBlank()) return;
        JavaMailSender sender = mailSenderProvider.getIfAvailable();
        if (sender == null) {
            log.warn("Notifications enabled but no mail sender configured; skipping.");
            return;
        }
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to.split(","));
            if (from != null && !from.isBlank()) msg.setFrom(from);
            if (replyTo != null && !replyTo.isBlank()) msg.setReplyTo(replyTo);
            msg.setSubject(subject);
            msg.setText(body);
            sender.send(msg);
            log.info("Sent notification email: {}", subject);
        } catch (Exception e) {
            log.warn("Failed to send notification email: {}", e.getMessage());
        }
    }
}
