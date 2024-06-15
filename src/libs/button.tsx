import { BgColor, BorderColor, FOCUS, HOVER, TextColor } from "@/enum/setting";
import React, { useMemo, memo, forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
  type?: "submit" | "button" | "reset";
  variant?: "outline" | "contained" | "other";
  fullWidth?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "grey" | "black";
  size?: "small" | "normal" | "large";
  disabled?: boolean;
};

const Button = forwardRef<
  HTMLButtonElement,
  Props & React.HTMLAttributes<HTMLButtonElement>
>(function Button(
  {
    children,
    startIcon,
    endIcon,
    className = "",
    type = "button",
    onClick,
    variant = "contained",
    fullWidth = false,
    disabled,
    color = "primary",
    size = "normal",
    ...args
  },
  ref,
) {
  const colorAttitude = useMemo(() => {
    return {
      error: `bg-support-c500 text-white px-5 py-2 text-sm hover:opacity-90 font-medium border-none`,
      grey: `bg-grey-c100 text-grey-c900 px-5 py-2 text-sm hover:bg-grey-c100 font-medium border-none`,
      secondary: `bg-secondary-c900 text-white px-5 py-2 text-sm hover:opacity-90 font-medium border-none`,
      primary: `bg-primary-c900 text-white px-5 py-2 text-sm hover:opacity-90 font-medium border-none`,
      info: `bg-blue-c900 text-white px-5 py-2 text-sm hover:opacity-90 font-medium border-none`,
      black: `bg-black text-white px-5 py-2 text-sm hover:opacity-90 font-medium border-none`,
    };
  }, []);

  return (
    <button
      {...args}
      ref={ref}
      type={type}
      className={`
                group 
                flex
                min-w-[4rem] flex-row
                items-center justify-center gap-2 rounded-full border-2 px-4
                py-2 text-center text-sm transition-all sm:text-sm md:text-base
                lg:text-base xl:text-base
                ${fullWidth ? `w-full` : `w-[auto]`}
                ${
                  disabled
                    ? `
                    ${BgColor.GREY_400}
                    ${TextColor.WHITE}
                    ${BorderColor.GREY_400}
                    !border-0
                `
                    : `
                    ${colorAttitude[color]}
                    !border-0
                    hover:scale-105
                    `
                }
                ${variant === "outline" ? BgColor.TRANSPARENT : ""}
                ${className}
            `}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
});

export default memo(Button);
