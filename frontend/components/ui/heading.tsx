// atoms/Heading.tsx
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
}

const sizes = {
  xl: "text-4xl font-bold",
  lg: "text-3xl font-semibold",
  md: "text-2xl font-semibold",
  sm: "text-xl font-medium"
};

export const Heading = ({ as: Tag = "h2", size = "lg", className, ...props }: HeadingProps) => (
  <Tag className={cn(sizes[size], className)} {...props} />
);
