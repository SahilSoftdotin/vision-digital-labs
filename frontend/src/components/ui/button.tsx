import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary-2 text-[#04121a] font-semibold shadow-[0_8px_30px_-8px_rgba(0,217,255,0.55)] hover:shadow-[0_10px_40px_-6px_rgba(0,217,255,0.7)] hover:-translate-y-0.5",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary-2 text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(123,97,255,0.6)]",
        outline:
          "border border-border-strong bg-white/[0.02] text-fg hover:bg-white/[0.06] hover:border-primary/50",
        ghost: "text-fg-muted hover:text-fg hover:bg-white/[0.05]",
        link: "text-primary-2 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
