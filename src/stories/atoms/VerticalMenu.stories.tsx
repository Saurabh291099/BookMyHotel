import VerticalMenu from "@/app/atoms/VerticalMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "atoms/VerticalMenu",
  component: VerticalMenu,
  tags: ["autodocs"],
  argTypes: {
    menuItems: {
      control: "object",
      description: "Array of menu items with title and active state",
      defaultValue: [
        { title: "Home", isActive: true },
        { title: "Profile", isActive: false },
        { title: "Settings", isActive: false },
      ],
    },
    listMainClass: {
      control: "text",
      defaultValue: "bg-white-50 p-4",
    },
    listItemClass: {
      control: "text",
      defaultValue: "text-lg",
    },
    className: {
      control: "text",
      description: "CSS class for the Text component",
      defaultValue: "text-neutral-900",
    },
  },
} satisfies Meta<typeof VerticalMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuItems: [
      {
        title: "Home",
        isActive: true,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "RFPs",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "Proposals",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "PO's",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "Sellers",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "Users",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
      {
        title: "Help & Support",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg", // Example valid path
      },
    ],
    listMainClass: "bg-white-50 p-4",
    listItemClass: "text-lg",
    className: "text-neutral-900",
  },
};
