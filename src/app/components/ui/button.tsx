import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,border-color,box-shadow,opacity] duration-200 ease-out motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ceriga-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ceriga-bg aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-ceriga-accent text-white hover:bg-ceriga-accent-hover",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-ceriga-border-strong bg-transparent text-ceriga-text hover:bg-white/[0.04] hover:border-white/20",
        secondary:
          "bg-ceriga-elevated text-ceriga-text hover:bg-ceriga-elevated-2",
        ghost:
          "text-ceriga-muted hover:bg-white/[0.04] hover:text-ceriga-text",
        link: "text-ceriga-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 px-4 text-[13px] has-[>svg]:px-3",
        lg: "h-11 px-7 text-[15px] has-[>svg]:px-5",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
