"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConsultationCta } from "@/components/booking/consultation-cta";
import { ChatWidget } from "@/components/chat/chat-widget";

/**
 * Renders the public marketing chrome (navbar, footer, floating widgets) for
 * site pages, but stays out of the way on /admin, which provides its own shell.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ConsultationCta />
      <ChatWidget />
    </>
  );
}
