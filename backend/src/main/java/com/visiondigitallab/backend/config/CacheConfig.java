package com.visiondigitallab.backend.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

/**
 * Enables Spring's caching. Uses the in-memory simple cache by default
 * (spring.cache.type=simple). Switch to Redis later by setting CACHE_TYPE=redis
 * and adding the Redis starter — no code changes here.
 */
@Configuration
@EnableCaching
public class CacheConfig {}
