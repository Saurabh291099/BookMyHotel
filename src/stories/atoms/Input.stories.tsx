import type { Meta, StoryObj } from '@storybook/react';
import  Input from '@/app/atoms/Input';

const meta = {
  title: 'atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'input-id',
    name: 'input-name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
  },
};
