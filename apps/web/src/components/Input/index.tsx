import { cn } from "@/utils";
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inner?: React.ReactNode | undefined;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, error, inner, ...rest } = props;

    return (
      <div
        className={cn("relative flex flex-col w-full", {
          "mb-6": Boolean(error),
        })}
      >
        <div className="relative">
          <input
            ref={ref}
            autoComplete="off"
            spellCheck={false}
            className={cn(
              "text-zinc-700",
              "px-2.5 py-1 outline-none",
              className,
            )}
            {...rest}
          />
          {inner}
        </div>
        {error && (
          <span className="text-primary-500 text-xs block mt-0.5 absolute top-full">
            {error}
          </span>
        )}
      </div>
    );
  },
);
