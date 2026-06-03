package com.visiondigitallab.backend.web;

import com.visiondigitallab.backend.dto.*;
import com.visiondigitallab.backend.service.ContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Public, read-only content endpoints consumed by the frontend. */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Content", description = "Public site content")
public class PublicContentController {

    private final ContentService content;

    public PublicContentController(ContentService content) {
        this.content = content;
    }

    @GetMapping("/services")
    @Operation(summary = "List all services")
    public List<ServiceDto> services() {
        return content.getServices();
    }

    @GetMapping("/services/{slug}")
    @Operation(summary = "Get a service by slug")
    public ServiceDto service(@PathVariable String slug) {
        return content.getService(slug);
    }

    @GetMapping("/casestudies")
    @Operation(summary = "List case studies, optionally filtered by industry and query")
    public List<CaseStudyDto> caseStudies(
            @RequestParam(required = false) String industry,
            @RequestParam(required = false, name = "q") String query) {
        return content.getCaseStudies(industry, query);
    }

    @GetMapping("/casestudies/{slug}")
    @Operation(summary = "Get a case study by slug")
    public CaseStudyDto caseStudy(@PathVariable String slug) {
        return content.getCaseStudy(slug);
    }

    @GetMapping("/testimonials")
    @Operation(summary = "List testimonials")
    public List<TestimonialDto> testimonials() {
        return content.getTestimonials();
    }

    @GetMapping("/stats")
    @Operation(summary = "List site statistics for a group (home|about)")
    public List<StatDto> stats(@RequestParam(defaultValue = "home") String group) {
        return content.getStats(group);
    }

    @GetMapping("/live/visitors")
    @Operation(summary = "Demo live-visitor count")
    public ResponseEntity<Map<String, Object>> visitors() {
        double t = System.currentTimeMillis() / 1000.0;
        double wave = Math.sin(t / 7) * 9 + Math.sin(t / 2.3) * 4;
        int visitors = (int) Math.max(12, Math.round(48 + wave));
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore())
                .body(Map.of("visitors", visitors, "at", java.time.Instant.now().toString()));
    }
}
