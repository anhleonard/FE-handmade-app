import { ColorState } from "@/enum/constants";
import { ReactNode } from "react";

interface MyLabelProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  px?: string;
  py?: string;
  type?:
    | "primary"
    | "error"
    | "success"
    | "warning"
    | "progress"
    | "delivery"
    | "grey";
}

const MyLabel: React.FC<MyLabelProps> = ({
  children,
  width,
  height,
  bgColor,
  px,
  py,
  type,
}) => {
  const setColorByType = (type: string) => {
    switch (type) {
      case "primary":
        return ColorState.primary;

      case "success":
        return ColorState.success;

      case "error":
        return ColorState.error;

      case "warning":
        return ColorState.warning;

      case "progress":
        return ColorState.progress;

      case "delivery":
        return ColorState.delivery;
      case "grey":
        return ColorState.grey;
    }
  };

  return (
    <div
      className={`flex font-semibold ${width ?? "w-fit "} ${height ?? "h-fit "} ${px ?? "px-3"} ${py ?? "py-1"} ${type ? setColorByType(type) : bgColor ? bgColor : "bg-primary-c800"} items-center justify-center rounded-full`}
    >
      {children}
    </div>
  );
};

export default MyLabel;
