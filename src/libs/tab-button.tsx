import { ReactNode } from "react";

interface MyTabButtonProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  bgHover?: string;
  px?: string;
  py?: string;
  onClick?: () => void;
}

const MyTabButton: React.FC<MyTabButtonProps> = ({
  children,
  width,
  height,
  bgColor,
  bgHover,
  px,
  py,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex ${onClick ? "cursor-pointer" : "cursor-default"} ${onClick ? (bgHover ? "hover:" + bgHover : "hover:bg-primary-c600") : ""} ${width ?? "w-fit "} ${height ?? "h-fit "} ${px ?? "px-3"} ${py ?? "py-1.5"} ${bgColor ?? "bg-primary-c800"} items-center justify-center rounded-full`}
    >
      {children}
    </div>
  );
};

export default MyTabButton;
