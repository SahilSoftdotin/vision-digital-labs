package com.visiondigitallab.backend.repository;

import com.visiondigitallab.backend.domain.CaseStudy;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    Optional<CaseStudy> findBySlug(String slug);

    List<CaseStudy> findAllByOrderByDisplayOrderAsc();

    List<CaseStudy> findByFeaturedTrueOrderByDisplayOrderAsc();

    List<CaseStudy> findByIndustryIgnoreCaseOrderByDisplayOrderAsc(String industry);
}
