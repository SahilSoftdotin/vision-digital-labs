"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarCheck, Check, Loader2 } from "lucide-react";
import { consultationSchema, type ConsultationInput } from "@/lib/schemas";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

/** Next 14 weekdays as selectable dates. */
function upcomingDates() {
  const out: { value: string; label: string }[] = [];
  const d = new Date();
  while (out.length < 14) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    const value = d.toISOString().slice(0, 10);
    out.push({
      value,
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }
  return out;
}

export function BookingForm({ onDone }: { onDone?: () => void }) {
  const dates = upcomingDates();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { date: "", time: "" },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  async function onSubmit(values: ConsultationInput) {
    try {
      await apiPost("/consultation", values);
      setDone(true);
      setTimeout(() => onDone?.(), 2200);
    } catch {
      // surfaced via a generic message; keep the form open
      alert("Something went wrong. Please try again.");
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-8 text-center"
      >
        <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[#04121a]">
          <Check className="size-8" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold">You're booked!</h3>
        <p className="mt-1 max-w-xs text-sm text-fg-muted">
          We&apos;ll email a calendar invite and confirmation shortly. Talk soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="b-name">Name</Label>
          <Input id="b-name" placeholder="Jane Doe" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="b-email">Email</Label>
          <Input
            id="b-email"
            type="email"
            placeholder="jane@company.com"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="b-company">Company (optional)</Label>
        <Input id="b-company" placeholder="Acme Inc." {...register("company")} />
      </div>

      <div>
        <Label>Choose a date</Label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dates.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setValue("date", d.value, { shouldValidate: true })}
              className={`shrink-0 rounded-xl border px-3 py-2 text-xs transition-colors ${
                selectedDate === d.value
                  ? "border-primary bg-primary/15 text-fg"
                  : "border-border-strong text-fg-muted hover:border-primary/40"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.date?.message} />
      </div>

      <div>
        <Label>Choose a time</Label>
        <div className="grid grid-cols-4 gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValue("time", t, { shouldValidate: true })}
              className={`rounded-xl border py-2 text-xs transition-colors ${
                selectedTime === t
                  ? "border-primary bg-primary/15 text-fg"
                  : "border-border-strong text-fg-muted hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <FieldError message={errors.time?.message} />
      </div>

      <div>
        <Label htmlFor="b-notes">Notes (optional)</Label>
        <Textarea
          id="b-notes"
          className="min-h-20"
          placeholder="What would you like to discuss?"
          {...register("notes")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <CalendarCheck className="size-4" />
        )}
        Confirm booking
      </Button>
    </form>
  );
}
