import React, { useState } from "react";

interface TabsProps {
  tabs: string[];
  orientation?: "horizontal" | "vertical";
  styleType?: "default" | "filled";
  alignment?: "left" | "right" | "center";
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  orientation = "horizontal",
  styleType = "default",
  alignment = "left",
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const orientationClass =
    orientation === "vertical"
      ? alignment === "right"
        ? "flex-col items-end"
        : "flex-col items-start"
      : "flex-row";

  const filledClass = styleType === "filled" ? "bg-primary-900 text-white" : "";

  return (
    <div className={`flex ${orientationClass} gap-4`}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`border-b-2 border-transparent py-2 px-4 ${
            index === activeIndex
              ? styleType === "filled"
                ? filledClass
                : "border-primary-900 text-primary-900"
              : "text-primary-900"
          } ${styleType === "default" ? "hover:border-primary-900" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
