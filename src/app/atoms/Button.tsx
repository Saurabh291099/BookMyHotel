import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import NextImage from "next/image";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "borderless" | "link";
  size?: "extraSmall" | "small" | "medium" | "normal";
  iconPosition?: "right" | "left";
  iconSrc?: string;
  fullWidth?: boolean;
  radius?: string;
  fontWeight?: string;
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  id,
  className,
  label,
  size = "medium",
  variant = "primary",
  radius = "rounded",
  fontWeight = "font-semibold",
  iconPosition = "left",
  iconSrc = "",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  ...rest
}) => {
  const buttonVariants = {
    primary:
      "bg-primary-900 text-basic-black outline-none focus:outline-none hover:bg-primary-800 border border-transparent focus:border-primary-800 disabled:bg-primary-100 disabled:text-neutral-400",
    ghost:
      "border border-primary-900 text-basic-black hover:bg-primary-50 hover:border-primary-800 hover:text-primary-800 focus:border-2 focus:bg-primary-100 disabled:bg-primary-100 disabled:border-none disabled:text-neutral-400",
    borderless:
      "text-primary-900 hover:bg-primary-100 border-2 border-transparent focus:border-primary-800 focus:bg-primary-100 disabled:bg-primary-100 disabled:text-neutral-400",
    link: "text-primary-900 border-b border-transparent hover:border-primary-800 hover:text-primary-800 focus:text-primary-800 active:text-primary-800 disabled:text-neutral-400 disabled:border-primary-300 !rounded-none p-0",
  };

  const buttonSizes = {
    extraSmall: "text-xs py-1 px-2",
    small: "text-sm py-2 px-3",
    medium: "text-base py-2 px-4",
    normal: "text-lg py-3 px-6",
  };

  return (
    <button
      type={type}
      id={id}
      className={classNames(
        className,
        radius,
        fontWeight,
        disabled ? "pointer-events-none" : "cursor-pointer",
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && "w-full",
        iconSrc && "flex gap-x-2 items-center",
        iconPosition === "right" && "flex-row-reverse",
        "transition-all ease-linear duration-300 rounded-md w-full inline-flex justify-center items-center"
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {iconSrc && <NextImage src={iconSrc} width={20} height={20} alt="icon" />}

      {label || children}
    </button>
  );
};

export default Button;
