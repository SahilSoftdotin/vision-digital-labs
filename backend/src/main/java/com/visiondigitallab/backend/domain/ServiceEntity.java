package com.visiondigitallab.backend.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    /** lucide-react icon name used by the frontend. */
    @Column(nullable = false)
    private String icon;

    @Column(nullable = false, length = 500)
    private String tagline;

    @Column(nullable = false, length = 2000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_features", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "feature", length = 200)
    @Builder.Default
    private List<String> features = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_deliverables", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "deliverable", length = 300)
    @Builder.Default
    private List<String> deliverables = new ArrayList<>();

    /** Slugs of related case studies. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_related_cases", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "case_slug", length = 120)
    @Builder.Default
    private List<String> relatedCaseStudies = new ArrayList<>();

    @Column(name = "display_order")
    private int displayOrder;
}
