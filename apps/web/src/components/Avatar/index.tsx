import { cn } from "@/utils";

export const Avatar = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "aspect-square w-12 h-12 rounded-full bg-secondary-500",
        className,
      )}
    />
  );
};
