import { cn } from "@/utils";
import * as React from "react";
import { Search as SearchIcon } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Search = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <div className="relative">
        <input
          type="text"
          name="search"
          ref={ref}
          autoComplete="off"
          placeholder="Search"
          spellCheck={false}
          className={cn(
            "peer block w-full rounded-full border-0 py-2 pl-12 pr-12 outline-none",
            "placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-zinc-700 dark:bg-zinc-900 bg-zinc-100",
            "sm:text-sm sm:leading-6",
            className,
          )}
          {...rest}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400 peer-focus:text-black dark:peer-focus:text-zinc-300">
          <SearchIcon size={20} />
        </div>
      </div>
    );
  },
);
