import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "@/app/molecules/LoginForm";

const meta = {
  title: "molecules/LoginForm", // Define the location in the Storybook hierarchy
  component: LoginForm,
  parameters: {
    layout: "centered", // Center the component in the preview
  },
  tags: ["autodocs"], // Enable Storybook Docs support
  argTypes: {
    onLoginSuccess: { action: "onLoginSuccess" }, // Add a control for the callback
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLoginSuccess: (email: string) => console.log(`Email submitted: ${email}`),
  },
};
