package com.visiondigitallab.backend.service;

import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.exception.ResourceNotFoundException;
import com.visiondigitallab.backend.mapper.EntityMapper;
import com.visiondigitallab.backend.repository.*;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Read-side service for public content. Cached because it changes rarely. */
@Service
@Transactional(readOnly = true)
public class ContentService {

    private final ServiceRepository serviceRepo;
    private final CaseStudyRepository caseRepo;
    private final TestimonialRepository testimonialRepo;
    private final SiteStatisticRepository statRepo;

    public ContentService(
            ServiceRepository serviceRepo,
            CaseStudyRepository caseRepo,
            TestimonialRepository testimonialRepo,
            SiteStatisticRepository statRepo) {
        this.serviceRepo = serviceRepo;
        this.caseRepo = caseRepo;
        this.testimonialRepo = testimonialRepo;
        this.statRepo = statRepo;
    }

    @Cacheable("services")
    public List<ServiceDto> getServices() {
        return serviceRepo.findAllByOrderByDisplayOrderAsc().stream()
                .map(EntityMapper::toDto)
                .toList();
    }

    public ServiceDto getService(String slug) {
        return serviceRepo
                .findBySlug(slug)
                .map(EntityMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + slug));
    }

    public List<CaseStudyDto> getCaseStudies(String industry, String query) {
        List<com.visiondigitallab.backend.domain.CaseStudy> list;
        if (industry != null && !industry.isBlank() && !industry.equalsIgnoreCase("All")) {
            list = caseRepo.findByIndustryIgnoreCaseOrderByDisplayOrderAsc(industry);
        } else {
            list = caseRepo.findAllByOrderByDisplayOrderAsc();
        }

        final String q = query == null ? "" : query.trim().toLowerCase();
        return list.stream()
                .filter(
                        c ->
                                q.isEmpty()
                                        || c.getTitle().toLowerCase().contains(q)
                                        || c.getClient().toLowerCase().contains(q)
                                        || c.getSummary().toLowerCase().contains(q)
                                        || c.getTags().stream()
                                                .anyMatch(t -> t.toLowerCase().contains(q)))
                .map(EntityMapper::toDto)
                .toList();
    }

    public CaseStudyDto getCaseStudy(String slug) {
        return caseRepo
                .findBySlug(slug)
                .map(EntityMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Case study not found: " + slug));
    }

    @Cacheable("testimonials")
    public List<TestimonialDto> getTestimonials() {
        return testimonialRepo.findAllByOrderByDisplayOrderAsc().stream()
                .map(EntityMapper::toDto)
                .toList();
    }

    @Cacheable(value = "stats", key = "#group")
    public List<StatDto> getStats(String group) {
        return statRepo.findByGroupOrderByDisplayOrderAsc(group).stream()
                .map(EntityMapper::toDto)
                .toList();
    }
}
