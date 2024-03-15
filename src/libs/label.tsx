import { ReactNode } from "react";

interface MyLabelProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  px?: string;
  py?: string;
}

const MyLabel: React.FC<MyLabelProps> = ({
  children,
  width,
  height,
  bgColor,
  px,
  py,
}) => {
  return (
    <div
      className={`flex ${width ?? "w-fit "} ${height ?? "h-fit "} ${px ?? "px-3"} ${py ?? "py-2"} ${bgColor ?? "bg-primary-c800"} items-center justify-center rounded-full`}
    >
      {children}
    </div>
  );
};

export default MyLabel;
