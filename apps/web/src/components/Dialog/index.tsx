import React from "react";
import * as D from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";
import { useTransition, animated, config } from "@react-spring/web";
import { Airplay } from "lucide-react";

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
}: Props) => {
  const transition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  return (
    <D.Root defaultOpen={true} open={open} onOpenChange={onOpenChange}>
      <D.Portal>
        {transition((style, item) =>
          item ? (
            <>
              <D.Overlay
                forceMount
                asChild
                className="bg-zinc-500 dark:bg-zinc-700 dark:bg-opacity-10 bg-opacity-40 animate-in fade-in fixed inset-0 z-50 backdrop-blur-sm transition-opacity"
              >
                <animated.div style={style} />
              </D.Overlay>
              <D.Content
                forceMount
                asChild
                className={cn(
                  "fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                  "z-50 grid w-full max-w-lg rounded-t-xl sm:rounded-3xl lg:max-w-screen-sm",
                  "scale-100 overflow-y-auto opacity-100 bg-white dark:bg-black md:w-full",
                  className,
                )}
              >
                <animated.div style={style}>
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
                </animated.div>
              </D.Content>
            </>
          ) : null,
        )}
      </D.Portal>
    </D.Root>
  );
};

export default Dialog;
