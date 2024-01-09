import React from "react";
import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          "bg-primary-500 rounded-full py-2 px-6 border border-black w-fit",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
