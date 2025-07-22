
import { cn } from "@/lib/utils.ts";

type SectionLabelProps = React.HTMLAttributes<HTMLHeadingElement>;

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold mt-6 mb-3 border-b border-gray-700 pb-1",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
