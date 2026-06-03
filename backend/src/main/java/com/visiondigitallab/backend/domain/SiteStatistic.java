package com.visiondigitallab.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_statistics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteStatistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String label;

    @Column(nullable = false)
    private long value;

    @Column(length = 10)
    private String suffix;

    @Column(length = 10)
    private String prefix;

    /** Grouping: "home" or "about". */
    @Column(name = "stat_group", nullable = false, length = 20)
    private String group;

    @Column(name = "display_order")
    private int displayOrder;
}
