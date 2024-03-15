// Or configure the styling elsewhere.
import "flatpickr/dist/flatpickr.css";

import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { MutableRefObject, useCallback, useRef } from "react";

export default function MyDatePicker() {
  const fp1 = useRef() as MutableRefObject<Instance>;

  const inputRef = useCallback((node: any) => {
    if (node !== null) {
      fp1.current = flatpickr(node, {
        onChange: function (selectedDates, dateStr, instance) {
          console.log({ selectedDates });
        },
      });
    }
  }, []);

  return (
    <input
      type="date"
      ref={inputRef}
      placeholder="yyyy/mm/dd"
      className="rounded-2xl border-[2px] border-grey-c50 px-3 py-3 text-base text-grey-c900 outline-none hover:border-primary-c200 focus:!border-primary-c400 active:!border-primary-c400"
    />
  );
}
