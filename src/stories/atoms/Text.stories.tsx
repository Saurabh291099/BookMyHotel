import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/app/atoms/Text";

const meta = {
  title: "atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "body",
    children: "this is a text atom",
  },
};
