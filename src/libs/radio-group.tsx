import { RadioItem } from "@/enum/defined-type";
import { useState } from "react";

interface MyRadioGroupProps {
  label?: string;
  className?: string;
  isRequired?: boolean;
  options?: Array<RadioItem>;
  selectedIndex?: number;
  onChanged?: (item: RadioItem) => void;
}

const MyRadioGroup: React.FC<MyRadioGroupProps> = ({
  label,
  className = "",
  isRequired,
  options,
  selectedIndex = 0,
  onChanged,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(selectedIndex);

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
        {label}
        {isRequired ? (
          <span className="text-base text-support-c500"> *</span>
        ) : null}
      </label>
      <div className="flex flex-row items-center gap-6">
        {options?.map((item: RadioItem, index) => {
          return (
            <label
              key={index}
              className="flex cursor-pointer select-none items-center"
            >
              <div className="relative text-grey-c900">
                <input
                  type="radio"
                  className="sr-only"
                  onClick={() => {
                    if (onChanged) onChanged(item);
                    setCurrentIndex(item.index);
                  }}
                />
                <div
                  className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-grey-c200 ${
                    currentIndex == item.index && "border-primary-c700"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                      currentIndex == item.index && "!bg-primary-c700"
                    }`}
                  >
                    {" "}
                  </span>
                </div>
              </div>
              {item.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MyRadioGroup;
