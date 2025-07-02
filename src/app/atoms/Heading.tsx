import React, { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontSize?: string;
  textColor?: string;
  fontWeight?: string;
  children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  className,
  fontSize,
  type,
  textColor,
  fontWeight,
  children,
  ...rest
}) => {
  const HeadingStyle = {
    h1: "text-5xl leding-[3rem]",
    h2: "text-4xl leading-10",
    h3: "text-3xl leading-9",
    h4: "text-2xl leading-8",
    h5: "text-xl leading-7",
    h6: "text-lg leading-7",
  };

  return React.createElement(
    type,
    {
      className: classNames(
        className,
        textColor,
        fontWeight,
        fontSize || HeadingStyle[type]
      ),
      ...rest,
    },
    children
  );
};

export default Heading;
