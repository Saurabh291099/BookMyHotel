import { Meta, StoryObj } from "@storybook/react";
// Adjust the path accordingly
import Textarea from "@/app/atoms/Textarea";

const meta = {
  title: "atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      description: "Whether the field is required",
      control: "boolean",
    },
    placeholder: {
      description: "Placeholder text for the textarea",
      control: "text",
    },
    isError: {
      description: "Indicates whether the textarea is in an error state",
      control: "boolean",
    },
    errorMessage: {
      description: "Message displayed when there's an error",
      control: "text",
    },
    variant: {
      description: "Defines the size variant of the textarea",
      control: {
        type: "select",
        options: ["large", "small", "extraSmall"],
      },
    },
    onChange: {
      description: "Callback triggered on value change",
      action: "changed",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default Textarea
export const Default: Story = {
  args: {
    id: "textarea-default",
    name: "textarea",
    required: true,
    placeholder: "Enter some text...",
    isError: false,
    errorMessage: "This field is required",
    variant: "large",
  },
};

// Story 2: Small Variant Textarea
export const SmallVariant: Story = {
  args: {
    id: "textarea-small",
    name: "textarea-small",
    required: false,
    placeholder: "Enter smaller text...",
    isError: false,
    variant: "small",
  },
};

// Story 3: Textarea with Error State
export const WithError: Story = {
  args: {
    id: "textarea-error",
    name: "textarea-error",
    required: true,
    placeholder: "This will show an error...",
    isError: true,
    errorMessage: "This field is required",
    variant: "large",
  },
};
