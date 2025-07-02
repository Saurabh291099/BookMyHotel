import FileUploader from "@/app/atoms/FileUploader";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "atoms/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accept: {
      description: "Allowed file MIME types",
      control: "object",
    },
    multiple: {
      description: "Allow multiple file uploads",
      control: "boolean",
    },
    maxSize: {
      description: "Maximum file size (in bytes)",
      control: "number",
    },
    onFileChange: {
      description: "Callback triggered when files are added or removed",
      action: "fileChanged",
    },
  },
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleFileUpload: Story = {
  args: {
    accept: {
      "application/pdf": [],
    },
    multiple: false,
    maxSize: 2000000, // 2MB
  },
};

export const MultipleFileUpload: Story = {
  args: {
    accept: {
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/pdf": [],
      "text/csv": [],
    },
    multiple: true,
    maxSize: 5000000, // 5MB
  },
};
