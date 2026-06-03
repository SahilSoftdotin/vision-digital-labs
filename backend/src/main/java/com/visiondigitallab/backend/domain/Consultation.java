package com.visiondigitallab.backend.domain;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;

@Entity
@Table(name = "consultations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String company;

    /** ISO date string (yyyy-MM-dd) chosen in the booking UI. */
    @Column(name = "preferred_date", nullable = false, length = 20)
    private String date;

    /** Time slot string (HH:mm). */
    @Column(name = "preferred_time", nullable = false, length = 20)
    private String time;

    @Column(length = 1000)
    private String notes;

    /** Where the booking came from: "web" or "chat". */
    @Column(nullable = false, length = 20)
    private String source;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
        if (source == null) source = "web";
    }
}
