package com.visiondigitallab.backend.repository;

import com.visiondigitallab.backend.domain.ChatLead;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatLeadRepository extends JpaRepository<ChatLead, Long> {
    List<ChatLead> findAllByOrderByCreatedAtDesc();
}
