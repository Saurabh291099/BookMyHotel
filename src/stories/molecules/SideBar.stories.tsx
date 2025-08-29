import SideBar from "@/app/molecules/SideBar";
import { Meta, StoryObj } from "@storybook/react";

// Define the metadata for the component
const meta: Meta<typeof SideBar> = {
  title: "molecules/SideBar", // This is where your component will appear in the Storybook UI
  component: SideBar, // The component being documented
  tags: ["autodocs"], // Optional, but useful for auto-generating documentation
  argTypes: {
    logoSrc: {
      control: "text", // Controls the 'logoSrc' as a text input in the Storybook UI
      description: "Logo image source",
      defaultValue: "/images/logo.svg", // Default logo path
    },
    menuItems: {
      control: "object", // Allows you to edit the menu items directly in Storybook
      description: "Array of menu items with title and active state",
      defaultValue: [
        {
          title: "Home",
          isActive: true,
          sideBarIcon: "/images/icons/home.svg",
        },
        {
          title: "Profile",
          isActive: false,
          sideBarIcon: "/images/icons/home.svg",
        },
        {
          title: "Settings",
          isActive: false,
          sideBarIcon: "/images/icons/home.svg",
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    logoSrc: "/images/logo.svg", // Default logo
    menuItems: [
      { title: "Home", isActive: true, sideBarIcon: "/images/icons/home.svg" },
      {
        title: "Profile",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg",
      },
      {
        title: "Settings",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg",
      },
    ],
  },
};

// Custom Logo Story
export const CustomLogo: Story = {
  args: {
    logoSrc: "/images/custom-logo.svg", // Custom logo
    menuItems: [
      { title: "Home", isActive: true, sideBarIcon: "/images/icons/home.svg" },
      {
        title: "Profile",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg",
      },
      {
        title: "Settings",
        isActive: false,
        sideBarIcon: "/images/icons/home.svg",
      },
    ],
  },
};

// Additional Story with different menu items
export const EmptyMenu: Story = {
  args: {
    logoSrc: "/images/logo.svg",
    menuItems: [], // No menu items
  },
};
