"use client";

import { ReactNode, useState } from "react";
import MyIcon from "./my-icon";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { COLORS } from "@/enum/colors";

interface MyTextFieldProps {
  id: string;
  name?: string;
  type?: "number" | "text" | "password";
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
  disabledText?: string;
  isError?: boolean;
  helperText?: string | null | ReactNode;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  endIcon?: ReactNode;
  minNumber?: number;
  maxNumber?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement & HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  hasInputNumber?: boolean;
}

const MyTextField: React.FC<MyTextFieldProps> = ({
  id,
  name,
  type = "text",
  title,
  placeholder,
  isRequired = true,
  disabled = false,
  disabledText = null,
  isError = false,
  helperText = null,
  className = "w-full",
  value,
  defaultValue,
  endIcon = null,
  minNumber,
  maxNumber,
  onChange = () => null,
  onKeyDown,
  hasInputNumber = false,
}) => {
  const [focus, setFocus] = useState(false);

  const handleKeyPress = (event: any) => {
    const isNumber = /[0-9]/i.test(event.key);
    if (!isNumber) {
      event.preventDefault();
    }
  };

  return (
    <div className={`${className}`}>
      <div className="hover:cursor-pointer">
        {title ? (
          <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
            {title}
            {isRequired ? (
              <span className="text-base text-support-c500"> *</span>
            ) : null}
          </label>
        ) : null}
        <div
          onClick={() => {
            if (!disabled) {
              setFocus(true);
              document.getElementById(id)?.focus();
            }
          }}
          className={`flex w-full items-center justify-between gap-1 rounded-2xl border-[2px] border-grey-c50 px-3 py-3 text-base font-normal text-grey-c900 placeholder-grey-c50 outline-none transition ${
            focus
              ? "border-primary-c400"
              : "border-grey-c50 hover:border-primary-c200"
          } ${
            disabled
              ? "cursor-default !border-grey-c200 bg-grey-c100 text-grey-c700"
              : ""
          }  dark:border-form-strokedark dark:bg-form-input dark:text-white ${
            isError
              ? "border-support-c500 bg-support-c10 text-support-c500 placeholder-support-c200 hover:border-support-c500"
              : ""
          }`}
        >
          <div
            className={`w-full ${
              disabled
                ? "cursor-default border-grey-c200 bg-grey-c100 text-grey-c500"
                : ""
            } ${
              isError
                ? "border-support-c500 bg-support-c10 text-support-c500 placeholder-support-c200 hover:border-support-c500 focus:border-support-c500"
                : ""
            }`}
          >
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              className="no-ring w-full border-none bg-transparent p-0 outline-none placeholder:text-grey-c200"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              min={minNumber}
              max={maxNumber}
              ref={(input) => {
                input &&
                  type === "text" &&
                  hasInputNumber &&
                  input.addEventListener("keypress", handleKeyPress);
              }}
              onKeyDown={onKeyDown}
            />
          </div>
          {endIcon ?? null}
        </div>
      </div>
      {(isError && helperText) || (disabled && disabledText) || helperText ? (
        <div className="mt-1 flex items-start justify-start gap-1">
          <WarningAmberRoundedIcon
            sx={{ color: COLORS.support.c500, fontSize: 14 }}
          />
          <div
            className={`text-xs font-medium ${
              isError ? "text-support-c500" : "text-grey-c800"
            }`}
          >
            {helperText}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyTextField;
