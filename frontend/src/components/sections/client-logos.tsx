/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/interactive/marquee";

const CLIENTS = [
  { name: "Aspen Dental", src: "/brands/aspen-dental.webp", h: "h-7" },
  { name: "Envision Healthcare", src: "/brands/envision.svg", h: "h-9" },
  { name: "AutoNation", src: "/brands/autonation.png", h: "h-9" },
  { name: "Compass Real Estate", src: "/brands/compass.png", h: "h-8" },
  { name: "Mr. Rooter Plumbing", src: "/brands/mr-rooter.svg", h: "h-10" },
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
            <img
              key={c.name}
              src={c.src}
              alt={c.name}
              className={`${c.h} w-auto shrink-0 opacity-60 brightness-0 invert transition-opacity duration-300 hover:opacity-100`}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
