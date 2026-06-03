package com.visiondigitallab.backend.repository;

import com.visiondigitallab.backend.domain.ServiceEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    Optional<ServiceEntity> findBySlug(String slug);

    List<ServiceEntity> findAllByOrderByDisplayOrderAsc();
}
