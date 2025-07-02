import CreateRFPForm from "@/app/molecules/CreateRFPForm";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CreateRFPForm> = {
  title: "Molecules/CreateRFPForm",
  component: CreateRFPForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreateRFPForm>;

export const Default: Story = {
  args: {
    onSave: (data) => alert(`Saved RFP: ${JSON.stringify(data, null, 2)}`),
    onSend: (data) => alert(`Sent RFP: ${JSON.stringify(data, null, 2)}`),
  },
};
