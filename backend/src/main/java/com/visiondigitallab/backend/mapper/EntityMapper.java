package com.visiondigitallab.backend.mapper;

import com.visiondigitallab.backend.domain.*;
import com.visiondigitallab.backend.dto.*;
import java.util.List;

/** Static entity → DTO mappers. Keeps controllers/services free of mapping noise. */
public final class EntityMapper {
    private EntityMapper() {}

    public static ServiceDto toDto(ServiceEntity s) {
        return new ServiceDto(
                s.getId(),
                s.getSlug(),
                s.getTitle(),
                s.getIcon(),
                s.getTagline(),
                s.getDescription(),
                List.copyOf(s.getFeatures()),
                List.copyOf(s.getDeliverables()),
                List.copyOf(s.getRelatedCaseStudies()));
    }

    public static CaseStudyDto toDto(CaseStudy c) {
        return new CaseStudyDto(
                c.getId(),
                c.getSlug(),
                c.getTitle(),
                c.getClient(),
                c.getIndustry(),
                c.getSummary(),
                c.getCover(),
                c.getImage(),
                c.getChallenge(),
                c.getSolution(),
                List.copyOf(c.getTechnologies()),
                c.getTimeline(),
                c.getResults().stream()
                        .map(r -> new CaseStudyDto.ResultDto(r.getLabel(), r.getValue()))
                        .toList(),
                List.copyOf(c.getTags()),
                c.isFeatured());
    }

    public static TestimonialDto toDto(Testimonial t) {
        return new TestimonialDto(
                t.getId(), t.getName(), t.getRole(), t.getCompany(), t.getQuote(), t.getRating());
    }

    public static StatDto toDto(SiteStatistic s) {
        return new StatDto(s.getLabel(), s.getValue(), s.getSuffix(), s.getPrefix());
    }

    public static AuthDtos.UserDto toDto(User u) {
        return new AuthDtos.UserDto(u.getId(), u.getName(), u.getEmail(), u.getRole());
    }
}
