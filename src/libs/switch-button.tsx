"use client";
import { BgColor } from "@/enum/setting";
import React from "react";

interface SwitchButtonProps {
  disabled?: boolean;
  checked: boolean;
  handleClickSwitchButton: () => void;
  name?: any;
  title?: string;
  isRequired?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  disabled,
  checked,
  handleClickSwitchButton,
  name,
  title,
  isRequired = false,
}) => {
  return (
    <div className="">
      {title ? (
        <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
          {title}
          {isRequired ? (
            <span className="text-base text-support-c500"> *</span>
          ) : null}
        </label>
      ) : null}
      <label
        className={`relative select-none ${!disabled ? "cursor-pointer" : "cursor-auto"}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleClickSwitchButton}
          className="sr-only"
          disabled={disabled}
          name={name}
        />

        <span
          className={`slider flex h-[29px] w-[50px] items-center rounded-full p-1 duration-200
            ${checked ? `${BgColor.PRIMARY_900}` : "bg-[#CCCCCE]"}
            ${disabled ? "opacity-60" : "opacity-100"}
          `}
        >
          <span
            className={`dot h-[22px] w-[22px] rounded-full bg-white duration-200 ${
              checked ? "translate-x-[20px]" : ""
            }`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default SwitchButton;
