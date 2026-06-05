/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/interactive/marquee";

// Real brand logos on white cards so every logo shows in full color on the dark
// theme. Mr. Rooter ships as a white-only logo, so it's flipped dark on the card.
const CLIENTS = [
  { name: "Aspen Dental", src: "/brands/aspen-dental.webp", h: "h-6", invert: false },
  { name: "Envision Healthcare", src: "/brands/envision.svg", h: "h-8", invert: false },
  { name: "AutoNation", src: "/brands/autonation.png", h: "h-9", invert: false },
  { name: "Compass Real Estate", src: "/brands/compass.png", h: "h-8", invert: false },
  { name: "Mr. Rooter Plumbing", src: "/brands/mr-rooter.svg", h: "h-8", invert: true },
];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-bg-2/30 py-10">
      <div className="container-x">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
          Trusted by leading brands across industries
        </p>
        <Marquee>
          {CLIENTS.map((c) => (
            <span
              key={c.name}
              className="flex h-16 shrink-0 items-center justify-center rounded-2xl bg-white px-7 shadow-sm"
            >
              <img
                src={c.src}
                alt={c.name}
                className={`${c.h} w-auto ${c.invert ? "brightness-0" : ""}`}
              />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
