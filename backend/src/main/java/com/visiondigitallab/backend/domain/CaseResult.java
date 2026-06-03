package com.visiondigitallab.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

/** A single headline metric on a case study, e.g. {"label":"Conversion","value":"+27%"}. */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaseResult {

    @Column(name = "result_label", length = 120)
    private String label;

    @Column(name = "result_value", length = 60)
    private String value;
}
