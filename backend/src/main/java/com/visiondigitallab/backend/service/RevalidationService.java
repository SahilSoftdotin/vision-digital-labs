package com.visiondigitallab.backend.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Tells the Next.js frontend to revalidate ISR cache tags after content changes
 * (on-demand revalidation). Fire-and-forget; failures never break the admin save.
 */
@Service
public class RevalidationService {

    private static final Logger log = LoggerFactory.getLogger(RevalidationService.class);

    // Force HTTP/1.1 — Java's default HTTP/2 negotiation fails against the
    // Next.js server ("header parser received no bytes").
    private final HttpClient http =
            HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_1_1)
                    .connectTimeout(Duration.ofSeconds(5))
                    .build();

    @Value("${app.revalidate.enabled:false}")
    private boolean enabled;

    @Value("${app.revalidate.url:}")
    private String url;

    @Value("${app.revalidate.secret:}")
    private String secret;

    public void revalidate(String... tags) {
        if (!enabled || url == null || url.isBlank()) return;
        try {
            String tagJson =
                    Arrays.stream(tags)
                            .map(t -> "\"" + t + "\"")
                            .collect(Collectors.joining(",", "[", "]"));
            String body = "{\"secret\":\"" + secret + "\",\"tags\":" + tagJson + "}";

            HttpRequest req =
                    HttpRequest.newBuilder(URI.create(url))
                            .header("Content-Type", "application/json")
                            .timeout(Duration.ofSeconds(8))
                            .POST(HttpRequest.BodyPublishers.ofString(body))
                            .build();

            http.sendAsync(req, BodyHandlers.ofString())
                    .thenAccept(
                            res -> {
                                if (res.statusCode() >= 300) {
                                    log.warn("Revalidation responded {}: {}", res.statusCode(), res.body());
                                }
                            })
                    .exceptionally(
                            ex -> {
                                log.warn("Revalidation call failed: {}", ex.getMessage());
                                return null;
                            });
        } catch (Exception e) {
            log.warn("Revalidation error: {}", e.getMessage());
        }
    }
}
