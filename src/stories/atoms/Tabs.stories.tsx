import Tabs from "@/app/atoms/Tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "atoms/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    styleType: {
      control: { type: "select" },
      options: ["default", "filled"],
    },
    alignment: {
      control: { type: "select" },
      options: ["left", "right", "center"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    orientation: "horizontal",
    styleType: "default",
    alignment: "left",
  },
};

export const FilledVerticalRight: Story = {
  args: {
    tabs: ["Tab A", "Tab B", "Tab C"],
    orientation: "vertical",
    styleType: "filled",
    alignment: "right",
  },
};
