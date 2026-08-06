import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  securePassword?: boolean;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  leftIcon?: React.ReactNode;
  iconContainerClassName?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      securePassword = false,
      label,
      labelClassName,
      wrapperClassName,
      leftIcon,
      iconContainerClassName,
      id: providedId,
      error,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const id = providedId || React.useId();

    const effectiveType = type === "password" && showPassword ? "text" : type;

    const hasLeftIcon = !!leftIcon;

    const inputElement = (
      <input
        type={effectiveType}
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",
          hasLeftIcon ? "pl-10" : "pl-3",
          securePassword && type === "password" ? "pr-10" : "pr-3",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    const inputWithIcons = (
      <div className="relative">
        {hasLeftIcon && (
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground",
              iconContainerClassName,
            )}
          >
            {leftIcon}
          </div>
        )}

        {inputElement}

        {securePassword && type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    );

    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              "text-sm font-medium text-foreground",
              labelClassName,
            )}
          >
            {label}
          </Label>
        )}

        {inputWithIcons}

        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };