import OTPForm from "@/app/molecules/OTPFormData";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "molecules/OTPForm", // Defines where this component appears in the Storybook hierarchy
  component: OTPForm,
  parameters: {
    layout: "centered", // Centers the component in the Storybook canvas
  },
  tags: ["autodocs"], // Adds support for Storybook Docs
  argTypes: {
    email: {
      control: "text", // Allows editing the email prop directly in Storybook
      description: "Email address to display in the OTP instructions",
    },
  },
} satisfies Meta<typeof OTPForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: "example@example.com", // Default email to show in the OTP form
  },
};

export const MissingEmail: Story = {
  args: {
    email: null, // Example case when the email is missing or null
  },
};
