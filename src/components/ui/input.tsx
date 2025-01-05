import * as React from "react";

import { cn } from "@/shared/utils/cn.util";

type PersistentInputProps = React.ComponentPropsWithoutRef<"input"> & {
  inputRef?: React.Ref<HTMLInputElement>;
};

type InputProps = PersistentInputProps &
  (
    | {
        icon: React.ReactNode;
        iconInsideInput?: boolean;
        onIconClick?: () => void;
      }
    | {
        icon?: never;
        iconInsideInput?: never;
        onIconClick?: never;
      }
  );

const Input = React.forwardRef<HTMLLabelElement, InputProps>(
  (
    { className, type, icon, inputRef, iconInsideInput, onIconClick, ...props },
    ref
  ) => {
    const IconElement = onIconClick ? "button" : "div";

    return (
      <label
        ref={ref}
        className={cn("flex items-stretch", {
          "group/input h-9 w-full gap-2 rounded-md border border-input px-3 py-1 shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50":
            iconInsideInput,
        })}
      >
        <input
          type={type}
          className={cn(
            "flex flex-1 bg-transparent text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none md:text-sm",
            className,
            {
              "h-9 w-full rounded-md border border-input px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50":
                !iconInsideInput,
            }
          )}
          ref={inputRef}
          {...props}
        />

        <IconElement
          className="flex items-center justify-center"
          onClick={onIconClick}
          type="button"
        >
          {icon}
        </IconElement>
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
