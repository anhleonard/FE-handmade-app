// Or configure the styling elsewhere.
import "flatpickr/dist/flatpickr.css";

import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import { DateOption } from "flatpickr/dist/types/options";
import { COLORS } from "@/enum/colors";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface MyDatePickerProps {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  disabled?: boolean;
  isError?: boolean;
  defaultDate?: DateOption;
  onChange?: (value: Date[]) => void;
  helperText?: string;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  id,
  name,
  label,
  placeholder,
  className = "w-full",
  isRequired = false,
  disabled = false,
  isError = false,
  defaultDate,
  onChange,
  helperText,
}) => {
  const fp1 = useRef() as MutableRefObject<Instance>;

  const inputRef = useCallback((node: any) => {
    if (node !== null) {
      fp1.current = flatpickr(node, {
        onChange: function (selectedDates, dateStr, instance) {
          if (onChange) onChange(selectedDates);
        },
        defaultDate: defaultDate,
      });
    }
  }, []);

  return (
    <div className={className}>
      <div>
        <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
          {label}
          {isRequired ? (
            <span className="text-base text-support-c500"> *</span>
          ) : null}
        </label>
        <input
          id={id}
          name={name}
          type="date"
          disabled={disabled}
          ref={inputRef}
          placeholder={placeholder ?? "yyyy/mm/dd"}
          className={`no-ring w-full cursor-pointer rounded-2xl border-[2px] border-grey-c50 px-3 py-3 text-base font-normal text-grey-c900 outline-none hover:border-primary-c200 focus:!border-primary-c400 disabled:!cursor-default disabled:border-grey-c200 disabled:bg-grey-c100 disabled:text-grey-c700 ${
            isError
              ? "border-support-c500 !bg-support-c10 !font-medium text-support-c500 placeholder-support-c200 hover:!border-support-c500 focus:!border-support-c500"
              : ""
          }`}
        />
      </div>
      {(isError && helperText) || (disabled && helperText) ? (
        <div className="mt-1 flex items-center justify-start gap-1">
          <WarningAmberRoundedIcon
            sx={{ color: COLORS.support.c500, fontSize: 14, marginTop: "2px" }}
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
export default MyDatePicker;
