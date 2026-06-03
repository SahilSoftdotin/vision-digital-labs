import { Eyebrow } from "@/components/ui/badge";

/** Shared inner-page hero header. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="absolute left-1/2 top-10 -z-10 h-52 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-secondary/15 blur-[110px]" />
      <div className="container-x text-center">
        {eyebrow && (
          <div className="mb-5 flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
