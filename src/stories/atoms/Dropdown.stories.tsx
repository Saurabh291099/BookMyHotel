import Dropdown from "@/app/atoms/Dropdown";
import type { Meta, StoryObj } from "@storybook/react";

// Meta configuration for Storybook
const meta = {
  title: "atoms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    errorMessage: {
      description: "Error message to display below the dropdown",
      control: "text",
    },
    placeholder: {
      description: "Placeholder text for the dropdown",
      control: "text",
    },
    options: {
      description: "Options available for selection",
      control: "object", // Object is more suitable for an array of objects in storybook controls
    },
    labelText: {
      description: "Label text for the dropdown",
      control: "text",
    },
    isDisabled: {
      description: "Disable the dropdown",
      control: "boolean",
    },
    onChange: {
      description: "Callback triggered when selection changes",
      action: "changed",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

// Define some reusable options
const sampleOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const errorMessage = "This field is required";

// Single-select example
export const SingleSelect: Story = {
  args: {
    labelText: "Select an option",
    options: sampleOptions,
    placeholder: "Select a value",
    isDisabled: false,
  },
};

// Multi-select example
export const MultiSelect: Story = {
  args: {
    labelText: "Select multiple options",
    options: sampleOptions,
    placeholder: "Select values",
    isDisabled: false,
  },
};

// Disabled state example
export const DisabledDropdown: Story = {
  args: {
    labelText: "Select an option",
    options: sampleOptions,
    placeholder: "Select a value",
    isDisabled: true,
  },
};

// Error state example
export const ErrorState: Story = {
  args: {
    labelText: "Select an option (with error)",
    options: sampleOptions,
    placeholder: "Select a value",
    errorMessage: errorMessage,
    isDisabled: false,
  },
};
