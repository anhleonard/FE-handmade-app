"use client";

import {
  BgColor,
  BorderColor,
  FOCUS,
  FontFamily,
  FontSize,
  HOVER,
  TextColor,
} from "@/enum/setting";
import React, {
  useMemo,
  memo,
  forwardRef,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import Typography from "./typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CancelIcon from "@mui/icons-material/Cancel";

export type Item = {
  value: string | number | boolean;
  label: React.ReactNode;
  startIcon?: React.ReactNode;
};

type Props = {
  id?: string;
  className?: string;
  onSelectItem?: (
    item: Item,
    ...args: any[]
  ) => any | React.Dispatch<React.SetStateAction<Item | null>>;
  onSelectMultiple?: (
    item: Array<Item>,
    ...args: any[]
  ) => any | React.Dispatch<React.SetStateAction<Array<Item> | null>>;
  title?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  selected?:
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | null;
  options: Array<Item>;
  selectClassName?: string;
  closeOnSelect?: boolean;
  itemClassName?: string;
  boxClassName?: string;
  multiple?: boolean;
  endIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  filterPlaceholder?: string;
  position?: "top" | "bottom" | "center";
  altLabel?: ReactNode;
  name?: string;
  filter?: boolean;
  isRequired?: boolean;
};

const isValueArray = (
  x: string | number | boolean | Array<string | number | boolean> | null,
): x is Array<string | number | boolean> => Array.isArray(x);

const getListItem = (
  selected: string | number | boolean | (string | number | boolean)[] | null,
  options: Array<Item>,
) => {
  let listItem: Array<Item> = [];
  if (isValueArray(selected)) {
    for (let i = 0; i < selected.length; i++) {
      const item = options.find((item) => item.value === selected[i]);
      if (item !== undefined) {
        listItem.push(item);
      }
    }
  } else {
    listItem = options.filter((item) => item.value === selected);
  }

  return listItem;
};

const Select = forwardRef<HTMLDivElement, Props>(function Select(
  {
    id,
    className = "",
    onSelectItem,
    onSelectMultiple,
    fullWidth,
    disabled,
    selected,
    options = [],
    selectClassName = "",
    closeOnSelect = true,
    boxClassName = "",
    itemClassName = "",
    multiple = false,
    endIcon,
    error,
    helperText,
    placeholder,
    filterPlaceholder,
    position = "bottom",
    altLabel,
    title,
    name,
    filter,
    isRequired = false,
    ...args
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [select, setSelect] = useState<Array<Item>>(
    selected !== undefined ? getListItem(selected, options) : [],
  );
  const [find, setFind] = useState<string>("");
  const fieldRef = useRef<HTMLFieldSetElement>(null);
  const filterOptions = useMemo(() => {
    if (find) {
      return options.filter((item) =>
        item.label?.toString().toLowerCase().includes(find.toLowerCase()),
      );
    }

    return options;
  }, [find, options]);

  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected === null) {
      setSelect([]);
    }
    if (selected !== undefined) {
      setSelect(getListItem(selected, options));
    }
  }, [selected, options]);

  const colorAttitude = useMemo(() => {
    return {
      error: `
                ${BgColor.SUPPORT_300}
                ${TextColor.GREY_900}      
                ${BorderColor.SUPPORT_500}
                ${FOCUS.BorderColor.SUPPORT}
                focus-within:border-support-c500
                `,
      normal: `
                ${BgColor.TRANSPARENT}
                ${TextColor.GREY_900}      
                ${BorderColor.GREY_50}
                ${FOCUS.BorderColor.PRIMARY}
                focus-within:border-primary-c400
                `,
      disable: `
                ${BgColor.GREY_100}
                ${TextColor.GREY_900}
                ${BorderColor.GREY_400}
                `,
    };
  }, []);

  const handleSelect = (item: Item) => {
    const index = select.findIndex((option) => option?.value === item.value);
    let newSelect = [...select];
    if (multiple) {
      if (index !== -1) {
        newSelect.splice(index, 1);
      } else {
        newSelect.push(item);
      }
      onSelectMultiple && onSelectMultiple(newSelect);
    } else {
      newSelect[0] = item;
    }

    setSelect(newSelect);
    onSelectItem && onSelectItem(item);

    if (closeOnSelect && !multiple) {
      handleOpenClose("close");
    }
  };

  const handleOpenClose = (type: "open" | "close") => {
    if (disabled) {
      return;
    }

    if (type === "open") {
      setOpen(true);
      setHidden(false);
      filter && filterRef.current?.focus();
    } else {
      setOpen(false);
      setTimeout(() => setHidden(true), 400);
    }
  };

  const renderText = () => {
    return select.length > 0 ? (
      multiple ? (
        <div className="flex w-[inherit] flex-row flex-wrap gap-1">
          {select.map((item, index) => (
            <div
              key={index}
              className={`flex min-w-0 gap-1 truncate ${colorAttitude["normal"]} rounded-full !bg-primary-c100 px-2.5`}
            >
              <span className={`block basis-auto truncate`}>{item.label}</span>
              <CancelIcon
                className="basis-auto py-1 text-primary-c500"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`flex w-[inherit] gap-2 truncate ${colorAttitude["normal"]}`}
        >
          <div className={`truncate`}>{select[0].label}</div>
        </div>
      )
    ) : (
      <Typography className={`inline-flex truncate !text-grey-c400`}>
        {placeholder}
      </Typography>
    );
  };

  return (
    <div className="relative">
      <div className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
        {title}
        {isRequired ? (
          <span className="text-base text-support-c500"> *</span>
        ) : null}
      </div>
      <div
        id={id}
        ref={ref}
        className={`
                    ${TextColor.GREY_700} 
                    ${FontSize.BASE} 
                    min-w-[7.5rem] 
                    max-w-full
                    bg-[inherit]
                    ${fullWidth ? "w-full" : "w-[auto]"}
                    ${boxClassName}
                `}
        {...args}
      >
        <fieldset
          ref={fieldRef}
          className={`
                                relative
                                h-fit
                                w-full 
                                min-w-0
                                rounded-2xl
                                border-[2px]
                                bg-[inherit] 
                                px-1
                                py-2
                                text-sm
                                outline-0 sm:text-sm md:text-base
                                ${!title ? "pt-2" : ""}
                                ${
                                  disabled
                                    ? `${colorAttitude["disable"]} cursor-default`
                                    : error
                                      ? `${colorAttitude["error"]} ${!open ? HOVER.BorderColor.SUPPORT : BorderColor.SUPPORT_700} cursor-pointer`
                                      : `${colorAttitude["normal"]} ${!open ? HOVER.BorderColor.PRIMARY : BorderColor.PRIMARY_400} cursor-pointer`
                                }
                                ${className}
                            `}
          onClick={(e) => {
            handleOpenClose(open && !filter ? "close" : "open");
          }}
          disabled={disabled}
        >
          <input
            value={select.map((it) => it.value).join("")}
            name={name}
            onChange={() => null}
            className="pointer-events-none absolute hidden select-none opacity-0"
          />
          <div className="flex w-full items-center justify-between gap-0 px-2 py-1 xl:py-1.5">
            <div className="relative flex w-[inherit] truncate">
              {altLabel ? (
                altLabel
              ) : (
                <div
                  className={`${open && filter ? "opacity-0" : "opacity-100"} z-10 flex w-full flex-row items-center gap-3 truncate`}
                >
                  {!multiple && select[0]?.startIcon}
                  {renderText()}
                </div>
              )}
              {filter && (
                <input
                  ref={filterRef}
                  value={find}
                  onChange={(e) => setFind(e.target.value)}
                  placeholder={filterPlaceholder}
                  className={`absolute w-full text-grey-c700 ${!open ? "opacity-0" : "z-50 opacity-100"} truncate bg-[inherit] outline-0`}
                />
              )}
            </div>
            {!open ? (
              <ArrowDropDownIcon
                className={`text-xl sm:text-xl md:text-2xl ${disabled ? "cursor-default" : "cursor-pointer"}`}
              />
            ) : (
              <ArrowDropUpIcon
                className={`text-xl sm:text-xl md:text-2xl ${disabled ? "cursor-default" : "cursor-pointer"}`}
              />
            )}
          </div>
        </fieldset>
        {error && (
          <Typography
            className="px-2"
            textColor={TextColor.SUPPORT_900}
            fontSize={FontSize.SM}
            fontFamily={FontFamily.NORMAL}
          >
            {helperText}
          </Typography>
        )}
      </div>
      {!hidden && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-transparent"
            onClick={() => handleOpenClose("close")}
          ></div>
          <ul
            style={{
              width: fieldRef.current?.offsetWidth,
              top: fieldRef.current
                ? position === "bottom"
                  ? fieldRef.current?.offsetTop + fieldRef.current?.offsetHeight
                  : position === "center"
                    ? fieldRef.current?.offsetTop +
                      fieldRef.current?.offsetHeight / 2
                    : fieldRef.current?.offsetTop
                : 0,
              left: fieldRef.current?.offsetLeft,
            }}
            className={`
                                absolute
                                z-50
                                max-h-48 
                                overflow-auto
                                rounded-md border-[1px]
                                bg-white 
                                py-1 
                                transition-all 
                                duration-[400ms]
                                focus:outline-none
                                ${fieldRef.current?.offsetWidth && fieldRef.current.offsetWidth <= 120 ? "min-w-min" : ""}
                                ${
                                  position === "bottom"
                                    ? "mt-1"
                                    : position === "center"
                                      ? "-translate-y-1/2"
                                      : "-mt-1 -translate-y-full"
                                }
                                ${open ? `origin-top opacity-100` : `origin-top opacity-0`}
                                ${
                                  disabled
                                    ? `${colorAttitude["disable"]} ${HOVER.BorderColor.GREY}`
                                    : error
                                      ? `${colorAttitude["error"]} ${HOVER.BorderColor.SUPPORT}`
                                      : `${colorAttitude["normal"]} ${HOVER.BorderColor.PRIMARY}`
                                }
                            `}
          >
            {filterOptions.map((option, index) => (
              <li
                key={index}
                className={`
                                        relative 
                                        cursor-pointer 
                                        select-none 
                                        px-3 py-2
                                        ${select.find((it) => it?.value === option.value) ? `bg-primary-c200 hover:bg-primary-c200` : `hover:bg-primary-c100`}
                                        ${itemClassName}
                                    `}
                onClick={() => handleSelect(option)}
              >
                <div className="flex w-full flex-row items-center justify-between gap-3 truncate">
                  <div className="flex w-full flex-row items-center gap-3 truncate">
                    {option.startIcon}
                    {option.label}
                  </div>
                  {endIcon}
                </div>
              </li>
            ))}
            {filterOptions.length <= 0 && (
              <div className="relative flex w-full select-none flex-row gap-3 truncate px-4 py-2">
                <div className="flex w-full flex-row items-center gap-3 truncate">
                  <Typography className="block truncate">No options</Typography>
                </div>
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
});

export default memo(Select);
