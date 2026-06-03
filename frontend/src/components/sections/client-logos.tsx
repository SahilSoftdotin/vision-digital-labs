import { Marquee } from "@/components/interactive/marquee";

const CLIENTS = [
  "NovaPay",
  "MedFlow",
  "CargoLink",
  "EstateX",
  "Scholarly",
  "ShopWave",
  "Vertex",
  "Lumen",
];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-bg-2/30 py-10">
      <div className="container-x">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
          Powering products for teams worldwide
        </p>
        <Marquee>
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="font-display text-2xl font-semibold text-fg-subtle/70 transition-colors hover:text-fg"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
