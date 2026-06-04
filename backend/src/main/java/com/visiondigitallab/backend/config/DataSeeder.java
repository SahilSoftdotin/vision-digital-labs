package com.visiondigitallab.backend.config;

import com.visiondigitallab.backend.domain.*;
import com.visiondigitallab.backend.repository.*;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds the database on first run (when empty) with the same content the
 * frontend ships as fixtures, plus a default admin user. Idempotent.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final ServiceRepository services;
    private final CaseStudyRepository cases;
    private final TestimonialRepository testimonials;
    private final SiteStatisticRepository stats;
    private final UserRepository users;
    private final PasswordEncoder encoder;

    @Value("${app.seed.enabled}")
    private boolean seedEnabled;

    @Value("${app.seed.admin-email}")
    private String adminEmail;

    @Value("${app.seed.admin-password}")
    private String adminPassword;

    public DataSeeder(
            ServiceRepository services,
            CaseStudyRepository cases,
            TestimonialRepository testimonials,
            SiteStatisticRepository stats,
            UserRepository users,
            PasswordEncoder encoder) {
        this.services = services;
        this.cases = cases;
        this.testimonials = testimonials;
        this.stats = stats;
        this.users = users;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (!seedEnabled) return;
        seedAdmin();
        if (services.count() == 0) seedServices();
        if (cases.count() == 0) seedCaseStudies();
        if (testimonials.count() == 0) seedTestimonials();
        if (stats.count() == 0) seedStats();
        backfillCaseStudyImages();
        backfillServices();
    }

    private static List<String> list(String... v) {
        return new ArrayList<>(List.of(v));
    }

    private static final String UNSPLASH =
            "https://images.unsplash.com/photo-%s?auto=format&fit=crop&w=900&q=70";

    /** slug → Unsplash photo id, used for both fresh seeds and backfill. */
    private static final java.util.Map<String, String> CASE_IMAGES =
            java.util.Map.of(
                    "medflow-patient-portal", "1576091160550-2173dba999ef",
                    "novapay-checkout", "1556742049-0cfed4f6a45d",
                    "cargolink-tms", "1586528116311-ad8dd3c8310d",
                    "estatex-marketplace", "1560518883-ce09059eeffa",
                    "scholarly-lms", "1523240795612-9a054b0db644",
                    "shopwave-commerce", "1556742502-ec7c0e9f34b1");

    private static String img(String slug) {
        String id = CASE_IMAGES.get(slug);
        return id == null ? null : String.format(UNSPLASH, id);
    }

    /** Populate image on existing rows that predate the image column. Idempotent. */
    private void backfillCaseStudyImages() {
        int patched = 0;
        for (CaseStudy c : cases.findAll()) {
            if ((c.getImage() == null || c.getImage().isBlank()) && img(c.getSlug()) != null) {
                c.setImage(img(c.getSlug()));
                cases.save(c);
                patched++;
            }
        }
        if (patched > 0) log.info("Backfilled images on {} case studies", patched);
    }

    private void seedAdmin() {
        User existing = users.findByEmail(adminEmail).orElse(null);
        if (existing == null) {
            users.save(
                    User.builder()
                            .name("Site Admin")
                            .email(adminEmail)
                            .password(encoder.encode(adminPassword))
                            .role(Role.ADMIN)
                            .build());
            log.info("Seeded admin user: {}", adminEmail);
            return;
        }
        // Keep the configured ADMIN_PASSWORD authoritative across deploys.
        // Idempotent: only rehashes when the stored password no longer matches.
        if (!encoder.matches(adminPassword, existing.getPassword())) {
            existing.setPassword(encoder.encode(adminPassword));
            existing.setRole(Role.ADMIN);
            users.save(existing);
            log.info("Synced admin password from ADMIN_PASSWORD for {}", adminEmail);
        }
    }

    private void seedServices() {
        List<ServiceEntity> s =
                List.of(
                        ServiceEntity.builder()
                                .slug("website-redesign")
                                .title("Website Redesign")
                                .icon("Paintbrush")
                                .tagline("Turn an outdated site into a high-converting flagship.")
                                .description(
                                        "We re-architect dated websites into fast, modern, conversion-focused experiences — backed by UX research, a refreshed design system, and measurable performance gains.")
                                .features(list("UX Audit", "UI Modernization", "Performance Optimization"))
                                .deliverables(
                                        list(
                                                "Heuristic + analytics UX audit",
                                                "New design system & component library",
                                                "Core Web Vitals optimization (90+ Lighthouse)",
                                                "SEO-preserving migration plan"))
                                .relatedCaseStudies(list("medflow-patient-portal", "novapay-checkout"))
                                .displayOrder(1)
                                .build(),
                        ServiceEntity.builder()
                                .slug("custom-web-applications")
                                .title("Custom Web Applications")
                                .icon("LayoutDashboard")
                                .tagline("SaaS platforms, enterprise portals and data-rich dashboards.")
                                .description(
                                        "From multi-tenant SaaS to internal enterprise portals, we build secure, scalable web applications with clean architecture and delightful UX.")
                                .features(list("SaaS", "Enterprise Portals", "Dashboards"))
                                .deliverables(
                                        list(
                                                "Multi-tenant SaaS architecture",
                                                "Role-based access & SSO",
                                                "Real-time dashboards & analytics",
                                                "API-first, integration-ready backend"))
                                .relatedCaseStudies(list("novapay-checkout", "cargolink-tms"))
                                .displayOrder(2)
                                .build(),
                        ServiceEntity.builder()
                                .slug("ai-solutions")
                                .title("AI Solutions")
                                .icon("Sparkles")
                                .tagline("Chatbots, assistants and workflow automation that ship.")
                                .description(
                                        "We integrate LLMs and automation into your product and operations — practical AI that reduces cost, speeds up teams, and creates new customer experiences.")
                                .features(list("Chatbots", "AI Assistants", "Workflow Automation"))
                                .deliverables(
                                        list(
                                                "RAG-powered assistants on your data",
                                                "Customer-facing chat & support bots",
                                                "Document & workflow automation",
                                                "Provider-agnostic AI architecture"))
                                .relatedCaseStudies(list("medflow-patient-portal", "scholarly-lms"))
                                .displayOrder(3)
                                .build(),
                        ServiceEntity.builder()
                                .slug("mobile-apps")
                                .title("Mobile Apps")
                                .icon("Smartphone")
                                .tagline("Native-quality iOS, Android and cross-platform apps.")
                                .description(
                                        "We design and build mobile apps that feel native, perform beautifully, and share a codebase to ship faster across platforms.")
                                .features(list("iOS", "Android", "Cross Platform"))
                                .deliverables(
                                        list(
                                                "React Native / Expo cross-platform builds",
                                                "Native modules where it matters",
                                                "Offline-first & push notifications",
                                                "App Store & Play Store launch support"))
                                .relatedCaseStudies(list("cargolink-tms", "estatex-marketplace"))
                                .displayOrder(4)
                                .build(),
                        ServiceEntity.builder()
                                .slug("cloud-devops")
                                .title("Cloud & DevOps")
                                .icon("Cloud")
                                .tagline("Migrate, scale and automate on AWS, Azure or GCP.")
                                .description(
                                        "We modernize infrastructure with containers, IaC and CI/CD — cutting cloud spend and shipping reliably with zero-downtime deploys.")
                                .features(list("AWS", "Azure", "GCP"))
                                .deliverables(
                                        list(
                                                "Cloud migration & cost optimization",
                                                "Containerization & Kubernetes",
                                                "Infrastructure as Code (Terraform)",
                                                "CI/CD pipelines & observability"))
                                .relatedCaseStudies(list("cargolink-tms", "novapay-checkout"))
                                .displayOrder(5)
                                .build(),
                        ServiceEntity.builder()
                                .slug("product-development")
                                .title("Product Development")
                                .icon("Rocket")
                                .tagline("From MVP to enterprise-grade product, end to end.")
                                .description(
                                        "We partner from idea to launch — validating fast with an MVP, then scaling into a robust product with the right architecture and team.")
                                .features(list("MVP", "Startup Launches", "Enterprise Systems"))
                                .deliverables(
                                        list(
                                                "Product discovery & roadmap",
                                                "Rapid MVP in weeks, not months",
                                                "Scalable architecture for growth",
                                                "Ongoing product engineering"))
                                .relatedCaseStudies(list("estatex-marketplace", "scholarly-lms"))
                                .displayOrder(6)
                                .build(),
                        seoService());
        services.saveAll(s);
        log.info("Seeded {} services", s.size());
    }

    /** SEO & Social service — also used by the backfill for existing databases. */
    private static ServiceEntity seoService() {
        return ServiceEntity.builder()
                .slug("seo-social")
                .title("SEO & Social")
                .icon("TrendingUp")
                .tagline("Get found everywhere — rank higher, grow social, convert more.")
                .description(
                        "We grow your organic visibility and social presence with technical SEO, content, and hands-on social media management — turning search and social into compounding, measurable growth.")
                .features(
                        list(
                                "Technical SEO",
                                "Content & On-Page",
                                "Social Media Management",
                                "Analytics & Reporting"))
                .deliverables(
                        list(
                                "Technical SEO audit & fixes (Core Web Vitals, schema, crawlability)",
                                "Keyword strategy & on-page content optimization",
                                "Social media management & content calendars",
                                "Monthly rankings, traffic & growth reporting"))
                .relatedCaseStudies(list("shopwave-commerce", "novapay-checkout"))
                .displayOrder(7)
                .build();
    }

    /** Insert services added after the initial seed (idempotent, for existing DBs). */
    private void backfillServices() {
        if (services.findBySlug("seo-social").isEmpty()) {
            services.save(seoService());
            log.info("Backfilled service: seo-social");
        }
    }

    private static CaseResult r(String label, String value) {
        return new CaseResult(label, value);
    }

    private void seedCaseStudies() {
        List<CaseStudy> c = new ArrayList<>();
        c.add(
                CaseStudy.builder()
                        .slug("medflow-patient-portal")
                        .title("A patient portal that cut no-shows by 41%")
                        .client("MedFlow Health")
                        .industry("Healthcare")
                        .summary(
                                "Redesigned a clunky patient portal into an accessible, AI-assisted experience that patients actually use.")
                        .cover("from-emerald-400/30 to-cyan-500/20")
                        .image(img("medflow-patient-portal"))
                        .challenge(
                                "MedFlow's legacy portal had a 22% task-completion rate. Patients struggled to book, reschedule, and find records — driving costly no-shows and call-center load.")
                        .solution(
                                "We ran a full UX audit, rebuilt the portal on Next.js with WCAG-AA accessibility, and added an AI assistant for scheduling and FAQs. Appointments became 3 taps; reminders went smart.")
                        .technologies(list("Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "OpenAI"))
                        .timeline("16 weeks")
                        .featured(true)
                        .tags(list("Web App", "AI", "Accessibility"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("Fewer no-shows", "-41%"),
                                                r("Task completion", "88%"),
                                                r("Call volume", "-34%"))))
                        .displayOrder(1)
                        .build());
        c.add(
                CaseStudy.builder()
                        .slug("novapay-checkout")
                        .title("A checkout redesign worth $12M in recovered revenue")
                        .client("NovaPay")
                        .industry("Fintech")
                        .summary(
                                "Re-engineered a fintech checkout for speed and trust, recovering abandoned revenue at scale.")
                        .cover("from-violet-500/30 to-blue-500/20")
                        .image(img("novapay-checkout"))
                        .challenge(
                                "A slow, multi-step checkout was bleeding conversions. Cart abandonment sat at 71% and PCI concerns blocked new features.")
                        .solution(
                                "We rebuilt checkout as a single fast flow, optimized Core Web Vitals to sub-1s LCP, hardened security, and added one-click payment methods.")
                        .technologies(list("Next.js", "Stripe", "Spring Boot", "Redis", "AWS"))
                        .timeline("12 weeks")
                        .featured(true)
                        .tags(list("Redesign", "Performance", "Fintech"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("Recovered revenue", "$12M"),
                                                r("Conversion lift", "+27%"),
                                                r("LCP", "0.9s"))))
                        .displayOrder(2)
                        .build());
        c.add(
                CaseStudy.builder()
                        .slug("cargolink-tms")
                        .title("Real-time logistics platform across 3 continents")
                        .client("CargoLink")
                        .industry("Logistics")
                        .summary("Built a real-time transport management system handling 40k shipments a day.")
                        .cover("from-amber-400/30 to-orange-500/20")
                        .image(img("cargolink-tms"))
                        .challenge(
                                "CargoLink ran operations on spreadsheets and email. Visibility was poor and scaling internationally was impossible.")
                        .solution(
                                "We delivered a cloud-native TMS with live tracking, route optimization, and a mobile driver app — deployed on Kubernetes for global scale.")
                        .technologies(
                                list("React", "React Native", "Spring Boot", "PostgreSQL", "Kubernetes"))
                        .timeline("24 weeks")
                        .featured(true)
                        .tags(list("Platform", "Mobile", "Cloud"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("Shipments/day", "40k"),
                                                r("On-time delivery", "+19%"),
                                                r("Ops cost", "-23%"))))
                        .displayOrder(3)
                        .build());
        c.add(
                CaseStudy.builder()
                        .slug("estatex-marketplace")
                        .title("A real-estate marketplace MVP launched in 9 weeks")
                        .client("EstateX")
                        .industry("Real Estate")
                        .summary("Took a property marketplace from idea to funded launch in under a quarter.")
                        .cover("from-cyan-400/30 to-teal-500/20")
                        .image(img("estatex-marketplace"))
                        .challenge(
                                "EstateX needed to validate a two-sided marketplace fast to secure a seed round — with no existing product.")
                        .solution(
                                "We shipped a polished MVP with listings, search, messaging and tour booking, instrumented for analytics to prove traction to investors.")
                        .technologies(list("Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Mapbox"))
                        .timeline("9 weeks")
                        .featured(false)
                        .tags(list("MVP", "Marketplace", "Startup"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("To launch", "9 wks"),
                                                r("Seed raised", "$3.5M"),
                                                r("Listings (mo. 1)", "1,200+"))))
                        .displayOrder(4)
                        .build());
        c.add(
                CaseStudy.builder()
                        .slug("scholarly-lms")
                        .title("An AI learning platform serving 200k students")
                        .client("Scholarly")
                        .industry("Education")
                        .summary("Modernized an LMS with adaptive AI tutoring and a scalable content pipeline.")
                        .cover("from-indigo-400/30 to-purple-500/20")
                        .image(img("scholarly-lms"))
                        .challenge(
                                "Scholarly's monolith couldn't scale during peak exam seasons and lacked personalization.")
                        .solution(
                                "We modularized the platform, added an AI tutor with RAG over course content, and moved to autoscaling cloud infrastructure.")
                        .technologies(list("Next.js", "Spring Boot", "Redis", "OpenAI", "Azure"))
                        .timeline("20 weeks")
                        .featured(false)
                        .tags(list("AI", "Modernization", "EdTech"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("Students", "200k"),
                                                r("Engagement", "+48%"),
                                                r("Peak uptime", "99.98%"))))
                        .displayOrder(5)
                        .build());
        c.add(
                CaseStudy.builder()
                        .slug("shopwave-commerce")
                        .title("Headless commerce replatforming for 8-figure DTC brand")
                        .client("ShopWave")
                        .industry("E-Commerce")
                        .summary("Replatformed a DTC brand to headless commerce, doubling site speed.")
                        .cover("from-pink-400/30 to-rose-500/20")
                        .image(img("shopwave-commerce"))
                        .challenge(
                                "A heavy legacy storefront throttled growth with slow pages and rigid merchandising.")
                        .solution(
                                "We moved ShopWave to a headless Next.js storefront with a flexible CMS and edge caching, unlocking fast iteration for the marketing team.")
                        .technologies(list("Next.js", "TypeScript", "GraphQL", "Vercel", "Redis"))
                        .timeline("14 weeks")
                        .featured(false)
                        .tags(list("Headless", "Performance", "Commerce"))
                        .results(
                                new ArrayList<>(
                                        List.of(
                                                r("Page speed", "2.1x"),
                                                r("Revenue/visit", "+31%"),
                                                r("Bounce rate", "-26%"))))
                        .displayOrder(6)
                        .build());
        cases.saveAll(c);
        log.info("Seeded {} case studies", c.size());
    }

    private void seedTestimonials() {
        List<Testimonial> t =
                List.of(
                        Testimonial.builder()
                                .name("Sarah Chen")
                                .role("VP Product")
                                .company("NovaPay")
                                .quote(
                                        "Vision Digital Lab rebuilt our checkout in 12 weeks and recovered millions in revenue. The most senior, low-drama team we've worked with.")
                                .rating(5)
                                .displayOrder(1)
                                .build(),
                        Testimonial.builder()
                                .name("Daniel Okoro")
                                .role("CTO")
                                .company("CargoLink")
                                .quote(
                                        "They took us from spreadsheets to a real-time platform across three continents. Architecture, execution, communication — all elite.")
                                .rating(5)
                                .displayOrder(2)
                                .build(),
                        Testimonial.builder()
                                .name("Maria Alvarez")
                                .role("Founder & CEO")
                                .company("EstateX")
                                .quote(
                                        "We launched our MVP in 9 weeks and raised our seed round off the back of it. Vision Digital Lab felt like a true product partner, not a vendor.")
                                .rating(5)
                                .displayOrder(3)
                                .build(),
                        Testimonial.builder()
                                .name("James Patel")
                                .role("Director of Engineering")
                                .company("Scholarly")
                                .quote(
                                        "The AI tutor they built genuinely moved our engagement numbers. Thoughtful about scale, cost, and the actual student experience.")
                                .rating(5)
                                .displayOrder(4)
                                .build(),
                        Testimonial.builder()
                                .name("Emily Roberts")
                                .role("Head of Digital")
                                .company("MedFlow Health")
                                .quote(
                                        "Accessibility and UX were night and day after the redesign. No-shows dropped 41% — that's real impact on patient care.")
                                .rating(5)
                                .displayOrder(5)
                                .build());
        testimonials.saveAll(t);
        log.info("Seeded {} testimonials", t.size());
    }

    private void seedStats() {
        List<SiteStatistic> s =
                List.of(
                        stat("Projects Delivered", 127, "+", null, "home", 1),
                        stat("Lines of Code Shipped", 4_200_000, "+", null, "home", 2),
                        stat("Client Revenue Impact", 180, "M+", "$", "home", 3),
                        stat("Countries Served", 15, "+", null, "home", 4),
                        stat("Projects Delivered", 100, "+", null, "about", 1),
                        stat("Client Satisfaction", 98, "%", null, "about", 2),
                        stat("Countries Served", 15, "+", null, "about", 3),
                        stat("Years of Craft", 9, "", null, "about", 4));
        stats.saveAll(s);
        log.info("Seeded {} statistics", s.size());
    }

    private static SiteStatistic stat(
            String label, long value, String suffix, String prefix, String group, int order) {
        return SiteStatistic.builder()
                .label(label)
                .value(value)
                .suffix(suffix)
                .prefix(prefix)
                .group(group)
                .displayOrder(order)
                .build();
    }
}
