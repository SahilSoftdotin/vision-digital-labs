package com.visiondigitallab.backend.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "case_studies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String client;

    /** Display industry name, e.g. "Healthcare", "E-Commerce". */
    @Column(nullable = false, length = 60)
    private String industry;

    @Column(nullable = false, length = 600)
    private String summary;

    /** Tailwind gradient token used as the cover overlay/fallback. */
    @Column(nullable = false)
    private String cover;

    /** Hero/cover photo URL. */
    @Column(length = 500)
    private String image;

    @Column(nullable = false, length = 2000)
    private String challenge;

    @Column(nullable = false, length = 2000)
    private String solution;

    @Column(nullable = false, length = 120)
    private String timeline;

    @Column(nullable = false)
    private boolean featured;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "case_technologies", joinColumns = @JoinColumn(name = "case_id"))
    @Column(name = "technology", length = 80)
    @Builder.Default
    private List<String> technologies = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "case_tags", joinColumns = @JoinColumn(name = "case_id"))
    @Column(name = "tag", length = 80)
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "case_results", joinColumns = @JoinColumn(name = "case_id"))
    @OrderColumn(name = "result_order")
    @Builder.Default
    private List<CaseResult> results = new ArrayList<>();

    @Column(name = "display_order")
    private int displayOrder;
}
