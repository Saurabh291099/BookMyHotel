// atoms/Text.tsx
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "muted" | "danger" | "success" | "small";
}

const variants = {
  default: "text-base text-gray-800",
  muted: "text-sm text-gray-500",
  danger: "text-red-600",
  success: "text-green-600",
  small: "text-xs text-gray-600"
};

export const Text = ({ variant = "default", className, ...props }: TextProps) => (
  <p className={cn(variants[variant], className)} {...props} />
);
