import React from "react";
import NextImage from "next/image";
import Heading from "../atoms/Heading";
import ComapanyLogo from "../../public/images/icons/add.svg";
import VerticalMenu from "../atoms/VerticalMenu";
import sideicon from "../../public/Icons/arrowDown.svg";
import Button from "../atoms/Button";
interface SidBarProps {
  logoSrc?: string;
  menuItems?: Array<{ title: string; isActive: boolean; sideBarIcon?: string }>;
}

const SideBar: React.FC<SidBarProps> = ({
  logoSrc = "/images/logo.svg",
  menuItems,
}) => {
  return (
    <div className="flex flex-col justify-between bg-black w-[16.25rem] h-[100vh] max-h-[100vh] rounded-[20px] p-4">
      <div>
        <div className="flex justify-between items-center">
          <div className="inline-flex gap-2 ">
            <NextImage width={24} height={24} src={logoSrc} alt="duke logo" />
            <Heading type="h6" className="text-[#FFC107]">
              Duke
            </Heading>
          </div>

          <NextImage
            width={24}
            height={24}
            src={ComapanyLogo}
            alt="duke logo"
          />
        </div>
        <div className="mt-4">
          <VerticalMenu menuItems={menuItems || []} />
        </div>
      </div>

      <Button label="Log out" iconPosition="left" iconSrc={sideicon} />
    </div>
  );
};

export default SideBar;
