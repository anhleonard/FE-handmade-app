"use client";

import { ReactNode, useState } from "react";
import MyIcon from "./my-icon";

interface MyTextFieldProps {
  id: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: "number" | "text" | "password";
  disabled?: boolean;
  disabledText?: string;
  isError?: boolean;
  helperText?: string | null;
  width?: string;
  value?: string | number;
  defaultValue?: string | number;
  endIcon?: ReactNode;
  onChange?: (value: string | number) => void;
}

const MyTextField: React.FC<MyTextFieldProps> = ({
  id,
  title,
  placeholder,
  isRequired = true,
  type = "text",
  disabled = false,
  disabledText = null,
  isError = false,
  helperText = null,
  width = "w-full",
  value,
  defaultValue,
  endIcon = null,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`${width}`}>
      <div>
        <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
          {title}
          {isRequired ? (
            <span className="text-base text-support-c500"> *</span>
          ) : null}
        </label>
        <div
          onClick={() => {
            if (!disabled) {
              setFocus(true);
              document.getElementById(id)?.focus();
            }
          }}
          className={`dark:focus:border-primary flex w-full items-center justify-between gap-1 rounded-2xl border-[2px] border-grey-c50 px-3 py-3 text-base font-normal text-grey-c900 placeholder-grey-c50 outline-none transition focus:border-primary-c400 ${focus ? "border-primary-c400" : "border-grey-c50"} ${disabled ? "cursor-default border-grey-c200 bg-grey-c100 text-grey-c500" : ""}  dark:border-form-strokedark dark:bg-form-input dark:text-white ${isError ? "border-support-c500 bg-support-c10 text-support-c500 placeholder-support-c200" : ""}`}
        >
          <div
            className={`w-full ${disabled ? "cursor-default border-grey-c200 bg-grey-c100 text-grey-c500" : ""} ${isError ? "border-support-c500 bg-support-c10 text-support-c500 placeholder-support-c200" : ""}`}
          >
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              className="w-full bg-transparent outline-none"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </div>
          {endIcon ?? null}
        </div>
      </div>
      {(isError && helperText) || (disabled && disabledText) ? (
        <div className="mt-1 flex items-center justify-start gap-1">
          <MyIcon width={3} height={3}>
            <path
              d="M12.937 16.5001C12.937 16.7487 12.8383 16.9872 12.6624 17.163C12.4866 17.3388 12.2482 17.4376 11.9995 17.4376C11.7509 17.4376 11.5124 17.3388 11.3366 17.163C11.1608 16.9872 11.062 16.7487 11.062 16.5001C11.062 16.2515 11.1608 16.013 11.3366 15.8372C11.5124 15.6614 11.7509 15.5626 11.9995 15.5626C12.2482 15.5626 12.4866 15.6614 12.6624 15.8372C12.8383 16.013 12.937 16.2515 12.937 16.5001ZM11.9995 6.7501C11.8006 6.7501 11.6099 6.82911 11.4692 6.96977C11.3285 7.11042 11.2495 7.30118 11.2495 7.5001V13.5001C11.2495 13.699 11.3285 13.8898 11.4692 14.0304C11.6099 14.1711 11.8006 14.2501 11.9995 14.2501C12.1984 14.2501 12.3892 14.1711 12.5299 14.0304C12.6705 13.8898 12.7495 13.699 12.7495 13.5001V7.5001C12.7495 7.30118 12.6705 7.11042 12.5299 6.96977C12.3892 6.82911 12.1984 6.7501 11.9995 6.7501ZM9.70153 2.85685C10.7005 1.04935 13.2985 1.04935 14.2975 2.85685L22.1673 17.1061C23.134 18.8551 21.868 21.0001 19.87 21.0001H4.12978C2.13103 21.0001 0.865782 18.8551 1.83178 17.1061L9.70153 2.85685ZM12.9843 3.5821C12.8871 3.40607 12.7444 3.25933 12.5712 3.15714C12.398 3.05496 12.2006 3.00106 11.9995 3.00106C11.7984 3.00106 11.601 3.05496 11.4278 3.15714C11.2546 3.25933 11.112 3.40607 11.0148 3.5821L3.14503 17.8313C3.05047 18.0026 3.00221 18.1956 3.00501 18.3912C3.00782 18.5868 3.06159 18.7783 3.16102 18.9468C3.26045 19.1153 3.4021 19.255 3.57199 19.352C3.74188 19.449 3.93414 19.5001 4.12978 19.5001H19.87C20.0657 19.5001 20.2579 19.449 20.4278 19.352C20.5977 19.255 20.7394 19.1153 20.8388 18.9468C20.9382 18.7783 20.992 18.5868 20.9948 18.3912C20.9976 18.1956 20.9493 18.0026 20.8548 17.8313L12.9843 3.5821Z"
              fill="#F13232"
            />
          </MyIcon>
          <div
            className={`text-xs font-medium ${isError ? "text-support-c500" : "text-grey-c800"}`}
          >
            {helperText}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyTextField;
