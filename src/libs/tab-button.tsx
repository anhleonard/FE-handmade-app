import { ReactNode } from "react";

interface MyTabButtonProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  px?: string;
  py?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const MyTabButton: React.FC<MyTabButtonProps> = ({
  children,
  width,
  height,
  px,
  py,
  isSelected = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex text-sm font-medium duration-200 ease-in-out hover:scale-105 hover:cursor-pointer ${isSelected ? "bg-primary-c900 text-white hover:bg-primary-c700" : "bg-primary-c100 text-grey-c900 hover:bg-primary-c200"} ${width ?? "w-fit "} ${height ?? "h-fit "} ${px ?? "px-3"} ${py ?? "py-1.5"} items-center justify-center rounded-full`}
    >
      {children}
    </div>
  );
};

export default MyTabButton;
