import React, { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant: "body" | "bodySmall" | "caption" | "stamp";
  fontSize?: string;
  fontWeight?: string;
  textColor?: string;
  children: ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  variant,
  fontSize,
  fontWeight,
  textColor,
  children,
  className,
  ...rest
}) => {
  const textStyle = {
    body: "text-base",
    bodySmall: "text-sm",
    caption: "text-xs",
    stamp: "text-[0.625rem] leading-[0.625rem]",
  };

  return (
    <p
      className={classNames(
        textStyle[variant],
        fontSize,
        fontWeight,
        textColor,
        className,
        "text-neutral-700"
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Text;
