"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";

interface FormData {
  email: string;
}

interface LoginFormProps {
  onLoginSuccess: (email: string) => void; // Callback for successful login
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Email submitted:", data.email);
    onLoginSuccess(data.email); // Notify parent of success
  };

  return (
    <div className="bg-white w-[29rem] h-[15rem] p-4 grid gap-2 rounded-2xl">
      <Heading type="h4">Login</Heading>

      <div className="my-2 w-full flex flex-col gap-1 items-start justify-center border">
        {/* <div className="w-full border"> */}
        <Input
          label="Email Id"
          type="email"
          variant="small"
          id="email"
          className="w-full"
          placeholder="Enter Email Id Here"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          errorMessage={errors.email?.message}
        />
        {/* </div> */}

        <div className="w-full flex items-center my-4 justify-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Send OTP"
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
