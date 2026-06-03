package com.visiondigitallab.backend.repository;

import com.visiondigitallab.backend.domain.SiteStatistic;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteStatisticRepository extends JpaRepository<SiteStatistic, Long> {
    List<SiteStatistic> findByGroupOrderByDisplayOrderAsc(String group);
}
