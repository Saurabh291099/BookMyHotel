import type { Meta, StoryObj } from '@storybook/react';
import  Label from '@/app/atoms/Label';

const meta = {
  title: 'atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'label',
    children : 'this is a label',
    labelFor: 'label'
  },
};
