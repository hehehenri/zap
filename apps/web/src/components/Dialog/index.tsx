import React from "react";
import * as D from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

type Props = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const Dialog = ({
  title,
  description,
  className,
  open,
  onOpenChange,
  children,
}: Props) => (
  <D.Root defaultOpen={true} open={open} onOpenChange={onOpenChange}>
    <D.Portal>
      <D.Overlay className="bg-zinc-500 dark:bg-zinc-700 dark:bg-opacity-10 bg-opacity-40 animate-in fade-in fixed inset-0 z-50 backdrop-blur-sm transition-opacity" />
      <D.Content
        className={cn(
          "animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:animate-contentShow sm:slide-in-from-bottom-0",
          "bottom-0 sm:bottom-auto sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]",
          "fixed z-50 grid w-full max-w-lg rounded-t-xl sm:rounded-3xl lg:max-w-screen-sm",
          "scale-100 overflow-y-auto py-6 px-10 opacity-100 bg-white dark:bg-black md:w-full",
          className,
        )}
      >
        {title && (
          <D.Title className="m-0 text-xl font-semibold pb-6 text-zinc-800">
            {title}
          </D.Title>
        )}
        {description && (
          <D.Description className="text-gray-500 mt-2 mb-5 text-sm leading-normal">
            {description}
          </D.Description>
        )}
        {children}
      </D.Content>
    </D.Portal>
  </D.Root>
);

export default Dialog;
