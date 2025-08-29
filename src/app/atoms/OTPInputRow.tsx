import React, { useRef } from "react";

interface OTPInputRowProps {
  length?: number; // Number of OTP inputs
  onChange: (otp: string) => void; // Callback with the full OTP value
  errorMessage?: string; // Error message to display
  disabled?: boolean; // Disable inputs
}

const OTPInputRow: React.FC<OTPInputRowProps> = ({
  length = 4,
  onChange,
  errorMessage,
  disabled = false,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length === 1 && index < length - 1) {
      inputsRef.current[index + 1]?.focus(); // Auto-focus next input
    }

    const otpValue = inputsRef.current.map((input) => input.value).join("");
    onChange(otpValue);
  };

  // Function to handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            disabled={disabled}
            className={`w-12 h-12 border text-center text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errorMessage ? "border-error-100" : "border-neutral-300"
            }`}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      {errorMessage && (
        <span className="text-error-100 text-sm mt-2">{errorMessage}</span>
      )}
    </div>
  );
};

export default OTPInputRow;
