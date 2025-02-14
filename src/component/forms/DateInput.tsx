import React from "react";

type DateInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: string;
  min?: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  max,
  min,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1"> {label} </label>
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        {...props}
      />
    </div>
  );
};

export default DateInput;
