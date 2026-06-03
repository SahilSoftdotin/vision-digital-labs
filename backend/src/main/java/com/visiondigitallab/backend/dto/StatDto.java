package com.visiondigitallab.backend.dto;

/** Mirrors the frontend SiteStat type. prefix may be null. */
public record StatDto(String label, long value, String suffix, String prefix) {}
