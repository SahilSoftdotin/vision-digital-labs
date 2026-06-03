import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-52 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-secondary/15 blur-[110px]" />
      <div>
        <p className="font-display text-7xl font-bold text-gradient sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          This page drifted off-grid
        </h1>
        <p className="mx-auto mt-3 max-w-md text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
