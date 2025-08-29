import React from "react";
import NextImage from "next/image";
import NothingImg from "../../public/images/nothing.svg";
import Heading from "../atoms/Heading";
import Button from "../atoms/Button";
import dornArrow from "../../public/Icons/arrowDown.svg";
interface NothingProps {
  imgSrc?: string;
}

const Nothing: React.FC<NothingProps> = ({}) => {
  return (
    <div className="h-[100vh] bg-white grid place-content-center items-center rounded-xl border ">
      <NextImage
        src={NothingImg}
        width={20}
        height={20}
        alt="Nothing to show"
        className="w-[9rem] h-[9rem]"
      />
      <Heading
        type="h4"
        textColor="text-neutral-500"
        fontWeight="font-semibold"
        className="my-4"
      >
        Nothing to show
      </Heading>

      <Button
        label="Create New RFP "
        iconPosition="right"
        iconSrc={dornArrow}
      />
    </div>
  );
};

export default Nothing;
