import { cn } from "@/lib/utils.ts";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
    return (
        <button className={cn("px-4 py-2 rounded bg-primary text-white bg-blue-600", className)} {...props} />
    );
}
