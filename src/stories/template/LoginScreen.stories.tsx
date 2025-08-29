import LoginScreen from "@/app/template/LoginScreen";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

const meta = {
  title: "templates/LoginScreen",
  component: LoginScreen,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const OTPScreen: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("Enter Email Id Here");
    await userEvent.type(emailInput, "test@example.com");

    const sendOtpButton = canvas.getByRole("button", { name: "Send OTP" });
    await userEvent.click(sendOtpButton);
  },
};
