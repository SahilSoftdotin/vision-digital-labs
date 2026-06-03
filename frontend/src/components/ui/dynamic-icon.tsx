import { icons, type LucideProps } from "lucide-react";

/** Renders a lucide icon by its string name (used for data-driven icons). */
export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? icons.Sparkles;
  return <Icon {...props} />;
}
