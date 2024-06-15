"use client";
import { COLORS } from "@/enum/colors";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface MyPrimaryTextFieldProps {
  id: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: "number" | "text" | "password" | "email";
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  helperText?: string | null;
  className?: string;
  inputClassName?: string;
  value?: string | number;
  defaultValue?: string | number;
  minNumber?: number;
  maxNumber?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement & HTMLInputElement>;
  hasInputNumber?: boolean;
}

const MyPrimaryTextField: React.FC<MyPrimaryTextFieldProps> = ({
  id,
  title,
  placeholder,
  isRequired = false,
  type = "text",
  name,
  disabled = false,
  isError = false,
  helperText = null,
  className = "w-full",
  inputClassName,
  value,
  defaultValue,
  minNumber,
  maxNumber,
  onChange = () => null,
  hasInputNumber = false,
}) => {
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
        <div className="relative">
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            className={`${inputClassName} no-ring w-full rounded-2xl border-[2px] border-grey-c50 bg-transparent px-3 py-3 text-grey-c900 outline-none placeholder:text-grey-c200 hover:border-primary-c200 focus:border-primary-c400  disabled:cursor-default disabled:border-grey-c200 disabled:bg-grey-c100 disabled:text-grey-c700 disabled:placeholder-grey-c500 ${
              isError
                ? "border-support-c500 !bg-support-c10 font-medium text-support-c500 placeholder-support-c200 hover:border-support-c500 focus:border-support-c500"
                : ""
            }`}
            min={minNumber}
            max={maxNumber}
            onChange={onChange}
            ref={(input) => {
              input &&
                type === "text" &&
                hasInputNumber &&
                input.addEventListener("keypress", handleKeyPress);
            }}
          />
        </div>
      </div>
      {(isError && helperText) || (disabled && helperText) ? (
        <div className="mt-1 flex items-center justify-start gap-1">
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

export default MyPrimaryTextField;
