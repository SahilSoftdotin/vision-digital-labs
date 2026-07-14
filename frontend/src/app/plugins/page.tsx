import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { AiPlugins } from "@/components/sections/ai-plugins";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMeta({
  title: "AI Plugins — the AI Front Office",
  description:
    "Five embeddable AI plugins for local businesses: smart lead capture, an AI receptionist, an instant proposal generator, a review manager, and an AI visibility scanner. One line of code, one price for all five.",
  path: "/plugins",
});

export default function PluginsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Front Office"
        title={
          <>
            Five AI plugins your business can{" "}
            <span className="text-gradient">run the front desk</span> with
          </>
        }
        description="Each one installs with a single script tag, works on any website, and is tailored to your business. Tap any plugin below to see exactly what it does."
      />
      <AiPlugins />
      <CtaBand />
    </>
  );
}
