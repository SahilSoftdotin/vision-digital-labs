"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import {
  contactSchema,
  type ContactInput,
  budgetOptions,
  serviceOptions,
} from "@/lib/schemas";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Input,
  Textarea,
  Select,
  Label,
  FieldError,
} from "@/components/ui/input";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    try {
      await apiPost("/contact", values);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-2xl border border-border-strong bg-panel/60 px-6 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[#04121a]"
        >
          <Check className="size-10" />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-semibold">
          Message sent!
        </h3>
        <p className="mt-2 max-w-sm text-fg-muted">
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border-strong bg-panel/40 p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Acme Inc." {...register("company")} />
          <FieldError message={errors.company?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Select id="budget" defaultValue="" {...register("budget")}>
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <FieldError message={errors.budget?.message} />
        </div>
        <div>
          <Label htmlFor="service">Service needed</Label>
          <Select id="service" defaultValue="" {...register("service")}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <FieldError message={errors.service?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="details">Project details</Label>
        <Textarea
          id="details"
          placeholder="Tell us about your goals, timeline and what success looks like…"
          {...register("details")}
        />
        <FieldError message={errors.details?.message} />
      </div>

      {serverError && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Send message
      </Button>
    </form>
  );
}
