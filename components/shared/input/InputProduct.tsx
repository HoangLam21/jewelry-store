import React, { useRef } from "react";
import classNames from "classnames";

interface InputVariantProps {
  width: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
}

const InputVariant = ({
  width,
  value,
  onChange = () => {},
  placeholder,
  name
}: InputVariantProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={classNames("flex flex-col text-text-dark-500 ", width)}>
      <input
        type="text"
        name={name} // Ensure each input has a unique name attribute
        className="h-[34px] border border-border-color rounded-lg px-2 focus:outline-none focus:ring-0 "
        value={value} // Allow dynamic value binding
        onChange={(e) => {
          onChange(e);
          inputRef.current?.focus(); // Đảm bảo focus không mất
        }}
        placeholder={placeholder} // Optional placeholder
      />
    </div>
  );
};

export default InputVariant;
