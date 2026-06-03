import { z } from "zod";

/** Shared validation schemas — reused by forms (client) and route handlers (server). */

export const budgetOptions = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
] as const;

export const serviceOptions = [
  "Website Redesign",
  "Custom Web Application",
  "AI Solutions",
  "Mobile App",
  "Cloud & DevOps",
  "Product Development",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(25, "Phone number looks too long"),
  budget: z.enum(budgetOptions, { message: "Select a budget range" }),
  service: z.enum(serviceOptions, { message: "Select a service" }),
  details: z
    .string()
    .min(20, "Tell us a bit more (at least 20 characters)")
    .max(2000, "Keep it under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const consultationSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  notes: z.string().max(1000).optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .optional(),
});

export const chatLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  interest: z.string().optional(),
});
