package com.visiondigitallab.backend.service;

import com.visiondigitallab.backend.domain.*;
import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.exception.ResourceNotFoundException;
import com.visiondigitallab.backend.mapper.EntityMapper;
import com.visiondigitallab.backend.repository.*;
import java.util.ArrayList;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Admin write operations with cache eviction on the affected read caches. */
@Service
@Transactional
public class AdminContentService {

    private final ServiceRepository serviceRepo;
    private final CaseStudyRepository caseRepo;
    private final TestimonialRepository testimonialRepo;

    public AdminContentService(
            ServiceRepository serviceRepo,
            CaseStudyRepository caseRepo,
            TestimonialRepository testimonialRepo) {
        this.serviceRepo = serviceRepo;
        this.caseRepo = caseRepo;
        this.testimonialRepo = testimonialRepo;
    }

    // ---- Services ----------------------------------------------------------

    @CacheEvict(value = "services", allEntries = true)
    public ServiceDto saveService(Long id, ServiceDto dto) {
        ServiceEntity e =
                id == null
                        ? new ServiceEntity()
                        : serviceRepo
                                .findById(id)
                                .orElseThrow(
                                        () -> new ResourceNotFoundException("Service " + id));
        e.setSlug(dto.slug());
        e.setTitle(dto.title());
        e.setIcon(dto.icon());
        e.setTagline(dto.tagline());
        e.setDescription(dto.description());
        e.setFeatures(new ArrayList<>(dto.features()));
        e.setDeliverables(new ArrayList<>(dto.deliverables()));
        e.setRelatedCaseStudies(new ArrayList<>(dto.relatedCaseStudies()));
        return EntityMapper.toDto(serviceRepo.save(e));
    }

    @CacheEvict(value = "services", allEntries = true)
    public void deleteService(Long id) {
        if (!serviceRepo.existsById(id)) throw new ResourceNotFoundException("Service " + id);
        serviceRepo.deleteById(id);
    }

    // ---- Case studies ------------------------------------------------------

    public CaseStudyDto saveCaseStudy(Long id, CaseStudyDto dto) {
        CaseStudy e =
                id == null
                        ? new CaseStudy()
                        : caseRepo.findById(id)
                                .orElseThrow(
                                        () -> new ResourceNotFoundException("Case study " + id));
        e.setSlug(dto.slug());
        e.setTitle(dto.title());
        e.setClient(dto.client());
        e.setIndustry(dto.industry());
        e.setSummary(dto.summary());
        e.setCover(dto.cover());
        e.setChallenge(dto.challenge());
        e.setSolution(dto.solution());
        e.setTimeline(dto.timeline());
        e.setFeatured(dto.featured());
        e.setTechnologies(new ArrayList<>(dto.technologies()));
        e.setTags(new ArrayList<>(dto.tags()));
        var results = new ArrayList<CaseResult>();
        dto.results().forEach(r -> results.add(new CaseResult(r.label(), r.value())));
        e.setResults(results);
        return EntityMapper.toDto(caseRepo.save(e));
    }

    public void deleteCaseStudy(Long id) {
        if (!caseRepo.existsById(id)) throw new ResourceNotFoundException("Case study " + id);
        caseRepo.deleteById(id);
    }

    // ---- Testimonials ------------------------------------------------------

    @CacheEvict(value = "testimonials", allEntries = true)
    public TestimonialDto saveTestimonial(Long id, TestimonialDto dto) {
        Testimonial e =
                id == null
                        ? new Testimonial()
                        : testimonialRepo
                                .findById(id)
                                .orElseThrow(
                                        () -> new ResourceNotFoundException("Testimonial " + id));
        e.setName(dto.name());
        e.setRole(dto.role());
        e.setCompany(dto.company());
        e.setQuote(dto.quote());
        e.setRating(dto.rating());
        return EntityMapper.toDto(testimonialRepo.save(e));
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    public void deleteTestimonial(Long id) {
        if (!testimonialRepo.existsById(id))
            throw new ResourceNotFoundException("Testimonial " + id);
        testimonialRepo.deleteById(id);
    }
}
