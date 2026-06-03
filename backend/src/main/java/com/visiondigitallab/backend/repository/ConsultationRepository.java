package com.visiondigitallab.backend.repository;

import com.visiondigitallab.backend.domain.Consultation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findAllByOrderByCreatedAtDesc();
}
