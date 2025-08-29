import React, { useState } from "react";
import Select, {
  DropdownIndicatorProps,
  components,
  SingleValue,
  MultiValue,
  ActionMeta,
} from "react-select";

import NextImage from "next/image";

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  errorMessage?: React.ReactNode;
  id?: string;
  name?: string;
  placeholder?: string;
  options: OptionType[];
  labelText?: string;
  htmlFor?: string;
  isDisabled?: boolean;
  onChange?: (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;

  defaultValue?: string;
}

const CaretDownIcon: React.FC = () => {
  return (
    <NextImage
      src="/images/icons/angle-right.svg"
      alt="arrow"
      width={24}
      height={24}
      className="transform rotate-90"
    />
  );
};

const CaretUpIcon: React.FC = () => {
  return (
    <NextImage
      src="/images/icons/angle-right.svg"
      alt="arrow"
      width={24}
      height={24}
      className="transform -rotate-90"
    />
  );
};

// Type for DropdownIndicator props (use the correct component type)
const DropdownIndicator: React.FC<DropdownIndicatorProps<OptionType>> = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? <CaretUpIcon /> : <CaretDownIcon />}
    </components.DropdownIndicator>
  );
};

const Dropdown: React.FC<DropdownProps> = ({
  errorMessage,
  id,
  name,
  placeholder,
  options,
  labelText,
  htmlFor,
  isDisabled,
  onChange = () => {},
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<OptionType> | MultiValue<OptionType>
  >(null);

  const handleChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOption(newValue);
    onChange(newValue, actionMeta);
  };

  return (
    <div className="flex flex-col w-full">
      {labelText && (
        <label htmlFor={htmlFor} className="text-neutral-700 text-sm mb-2">
          {labelText}
        </label>
      )}

      <Select
        id={id}
        name={name}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        defaultValue={
          defaultValue
            ? options.find((option) => option.value === defaultValue)
            : undefined
        }
        isDisabled={isDisabled}
        components={{ DropdownIndicator }}
        classNamePrefix="react-select"
        className="w-full"
        styles={{
          control: (provided, state) => ({
            ...provided,
            minHeight: "40px",
            height: "40px",
            borderColor: state.isDisabled
              ? "gray-300"
              : state.isFocused
              ? "blue-700"
              : errorMessage
              ? "red-500"
              : "gray-500",
            borderRadius: "4px",
            cursor: state.isDisabled ? "not-allowed" : "pointer",
            paddingLeft: "16px",
            paddingRight: "8px",
            backgroundColor: state.isDisabled ? "gray-100" : "white",
          }),
          menu: (provided) => ({
            ...provided,
            borderWidth: "1px",
            borderColor: "gray-500",
            borderRadius: "4px",
          }),
          option: (provided) => ({
            ...provided,
            color: "black",
            backgroundColor: "white",
            padding: "8px 16px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "gray-100",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0px",
          }),
        }}
      />
      {errorMessage && (
        <div className="text-red-500 text-xs mt-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default Dropdown;
