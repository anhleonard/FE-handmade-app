import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RadioItem } from "@/enum/defined-type";
import { COLORS } from "@/enum/colors";

interface MyRadioButtonsGroupProps {
  label?: string;
  className?: string;
  isRequired?: boolean;
  options?: Array<RadioItem>;
  defaultValue: string;
  onChanged?: (value: string) => void;
  disabled?: boolean;
}

export default function MyRadioButtonsGroup({
  label,
  className,
  isRequired,
  options,
  defaultValue,
  onChanged,
  disabled = false,
}: MyRadioButtonsGroupProps) {
  return (
    <div className={`w-full ${className}`}>
      <FormControl>
        {label && (
          <FormLabel
            id="demo-radio-buttons-group-label"
            className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white"
            sx={{
              color: COLORS.grey.c900,
              "&.Mui-focused": {
                color: COLORS.grey.c900,
              },
            }}
          >
            {label}
            {isRequired ? (
              <span className="text-base text-support-c500"> *</span>
            ) : null}
          </FormLabel>
        )}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={defaultValue}
          name="radio-buttons-group"
          onChange={(e, value) => {
            if (onChanged) {
              onChanged(value);
            }
          }}
          className="flex flex-row items-center gap-6"
        >
          {options?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                value={item.value}
                disabled={disabled}
                control={
                  <Radio
                    sx={{
                      color: COLORS.grey.c100,
                      "&.Mui-checked": {
                        color: COLORS.primary.c900,
                      },
                    }}
                  />
                }
                label={item.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
