import React, { useState } from "react";
import NextImage from "next/image";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import OTPForm from "../molecules/OTPFormData";
import LoginForm from "../molecules/LoginForm";

const LoginScreen: React.FC = () => {
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Callback for successful email submission
  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setShowOtpCard(true);
  };

  return (
    <div className="w-full h-[100vh] bg-[#333333] grid place-items-center">
      <div className="grid place-items-center gap-2">
        <NextImage
          src="/images/logo.svg"
          width={43}
          height={43}
          alt="Welcome to Duke"
        />

        <Heading type="h3" className="text-white-50">
          Welcome to Duke
        </Heading>

        <Text variant="bodySmall" className="mb-2">
          Please enter the {showOtpCard ? "OTP" : "Email ID"}
        </Text>

        {!showOtpCard && <LoginForm onLoginSuccess={handleLoginSuccess} />}

        {showOtpCard && <OTPForm email={userEmail} />}
      </div>
    </div>
  );
};

export default LoginScreen;
