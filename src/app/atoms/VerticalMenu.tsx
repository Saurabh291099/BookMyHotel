import React from "react";
import Link from "next/link";
import Text from "./Text";
import NextImage from "next/image";

interface MenuItem {
  title: string;
  isActive?: boolean;
  sideBarIcon?: string; // Icon for individual menu item
}

interface VerticalMenuProps {
  menuItems: MenuItem[];
  listMainClass?: string;
  listItemClass?: string;
  className?: string;
  defaultSideBarIcon?: string;
  onclick?: () => void;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({
  menuItems = [],
  listMainClass = "",
  listItemClass = "",
  className = "",
  defaultSideBarIcon = "/images/icon/setting.svg",
}) => {
  return (
    <div>
      <ul className={`flex flex-col space-y-2 ${listMainClass}`}>
        {menuItems.map((menu, index) => (
          <Link key={index} href="/">
            <li
              className={`flex gap-4 px-4 pt-2 pb-3 hover:bg-gradient-to-r hover:from-[#333333] hover:to-[#4A4D4B] transition-all duration-300
                ${
                  menu.isActive
                    ? "bg-gradient-to-r from-[#333333] to-[#4A4D4B]"
                    : ""
                } ${listItemClass}`}
            >
              {menu.sideBarIcon && (
                <NextImage
                  src={menu.sideBarIcon || defaultSideBarIcon} // Use item's icon or fallback
                  width={20} // Adjust size as needed
                  height={20}
                  alt={`${menu.title} Icon`}
                />
              )}

              <Text
                variant="bodySmall"
                className={`cursor-pointer ${className}`}
              >
                {menu.title}
              </Text>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VerticalMenu;
