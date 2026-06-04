import { Marquee } from "@/components/interactive/marquee";
import { LogoChip } from "@/components/cards/logo-chip";

const CLIENTS = [
  { name: "Aspen Dental", mono: "AD", tint: "from-cyan-400 to-teal-400" },
  { name: "Envision Healthcare", mono: "EH", tint: "from-sky-400 to-cyan-400" },
  { name: "AutoNation", mono: "AN", tint: "from-amber-400 to-orange-400" },
  { name: "Compass Real Estate", mono: "CR", tint: "from-emerald-400 to-teal-400" },
  { name: "Mr. Rooter Plumbing", mono: "MR", tint: "from-blue-400 to-sky-400" },
];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-bg-2/30 py-10">
      <div className="container-x">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
          Trusted by leading brands across industries
        </p>
        <Marquee>
          {CLIENTS.map((c) => (
            <LogoChip key={c.name} name={c.name} mono={c.mono} tint={c.tint} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
