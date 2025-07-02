import React, { useEffect, useRef } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps {
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>; // React Hook Form's register function
  value?: string;
  variant?: "large" | "small" | "extraSmall";
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  required = false,
  placeholder = "",
  className = "",
  isError = false,
  errorMessage,
  disabled = false,
  register,
  value,
  variant = "large",
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow logic (adjusts height based on content)
  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const minHeight = 40;
    const maxHeight = 200;
    const textarea = e.target;

    let height = textarea.scrollHeight;

    if (height < minHeight) {
      height = minHeight;
    } else if (height > maxHeight) {
      height = maxHeight;
    }

    textarea.style.height = `${height}px`;
  };

  // Reset height on value change or component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height before adjusting
      if (textareaRef.current.scrollHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  }, [value]);

  // Size variants for different styles
  const sizeVariant = {
    large: "p-4 text-base",
    small: "p-2 text-sm",
    extraSmall: "p-2 text-xs",
  };

  return (
    <>
      <textarea
        id={id}
        value={value}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        {...(register ? register(name) : {})} // React Hook Form's register (handles name and ref)
        onChange={onChange}
        onInput={autoGrow}
        ref={textareaRef} // Reference to the textarea element
        className={`border border-neutral-300 hover:border-neutral-500 focus:border-primary-900 rounded-lg
             placeholder:text-neutral-400 hover:placeholder:text-neutral-400 
             focus:outline-none text-neutral-900 disabled:bg-neutral-100 disabled:pointer-events-none 
             disabled:select-none w-full resize-none 
             ${isError ? "border-2 border-error-100 font-normal" : ""}
             ${className} ${sizeVariant[variant]}`}
      />
      {isError && (
        <span className="text-error-100 text-sm block mt-1">
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default Textarea;
