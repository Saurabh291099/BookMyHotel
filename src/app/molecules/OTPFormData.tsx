"use client";
import React from "react";
import Heading from "../atoms/Heading";
import OTPInputRow from "../atoms/OTPInputRow";
import Button from "../atoms/Button";

interface OTPFormProps {
  email: string | null; // Email to display in the message
}

const OTPForm: React.FC<OTPFormProps> = ({ email }) => {
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="bg-white w-[29rem] p-6 rounded-xl shadow-md">
      <Heading type="h4">OTP verification</Heading>
      <p className="text-sm text-neutral-600 mt-2">
        Enter the 4-digit OTP that has been sent to{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <div className="mt-4">
        <OTPInputRow length={4} onChange={setOtp} />
      </div>
      <Button
        onClick={handleVerify}
        label="Verify OTP"
        variant="primary"
        className="w-full mt-6"
        disabled={otp.length < 4}
      />
    </div>
  );
};

export default OTPForm;
