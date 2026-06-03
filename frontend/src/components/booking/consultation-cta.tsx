"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "./booking-form";

/**
 * Global floating "Book Free Consultation" button (bottom-right) + modal.
 * Sits to the left of the chat widget so the two never overlap.
 */
export function ConsultationCta() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-6 right-[5.5rem] z-40">
        <AnimatePresence>
          <DialogTrigger asChild>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-secondary-2 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(123,97,255,0.7)]"
            >
              <CalendarDays className="size-4" />
              <span className="hidden sm:inline">Book Free Consultation</span>
              <span className="sm:hidden">Book a call</span>
            </motion.button>
          </DialogTrigger>
        </AnimatePresence>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a free consultation</DialogTitle>
          <DialogDescription>
            Grab a 30-minute slot — we&apos;ll review your goals and map a path
            forward. No commitment.
          </DialogDescription>
        </DialogHeader>
        <BookingForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
