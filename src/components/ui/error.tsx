import { cn } from "@/shared/utils/cn.util";
import { forwardRef, HTMLAttributes } from "react";

export const Error = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn("mx-auto flex w-full max-w-sm flex-col gap-2", className)}
    />
  )
);
Error.displayName = "Error";

export const ErrorTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ErrorTitle.displayName = "ErrorTitle";

export const ErrorDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ErrorDescription.displayName = "ErrorDescription";
