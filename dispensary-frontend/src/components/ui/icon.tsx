import { forwardRef } from "react";
import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva("", {
  variants: {
    size: {
      default: "w-5 h-5",
      sm: "w-4 h-4",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface IconProps
  extends Omit<LucideProps, "ref" | "size">,
    VariantProps<typeof iconVariants> {
  name: keyof typeof icons;
  className?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size, variant, ...props }, ref) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in lucide-react`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants };