package com.visiondigitallab.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "author_role", nullable = false)
    private String role;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false, length = 800)
    private String quote;

    @Column(nullable = false)
    private int rating;

    @Column(name = "display_order")
    private int displayOrder;
}
