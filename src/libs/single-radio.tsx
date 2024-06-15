import React, { FC } from "react";

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  defaultChecked?: boolean;
  sizeClassName?: string;
  label?: string;
}

const Radio: FC<RadioProps> = ({
  className = "",
  name,
  id,
  onChange,
  label,
  sizeClassName = "w-5 h-5",
  defaultChecked,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`no-ring focus:ring-action-primary cursor-pointer rounded-full border-slate-400 bg-transparent text-primary-c800 transition duration-200 hover:border-slate-700 focus:ring-primary-c800 dark:border-slate-700 dark:checked:bg-primary-c800 dark:hover:border-slate-500 ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        value={id}
      />
      {label && (
        <label
          htmlFor={id}
          className="block cursor-pointer select-none pl-2.5 text-slate-900 dark:text-slate-100 sm:pl-3"
          dangerouslySetInnerHTML={{ __html: label }}
        ></label>
      )}
    </div>
  );
};

export default Radio;
