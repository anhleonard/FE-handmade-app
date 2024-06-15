import { ColorState, ProductStatus } from "@/enum/constants";
import { ReactNode } from "react";

interface MyStatusProps {
  label?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  px?: string;
  py?: string;
  status?: ProductStatus;
}

const MyStatus: React.FC<MyStatusProps> = ({
  label,
  width,
  height,
  bgColor,
  px,
  py,
  status,
}) => {
  const setColorByStatus = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.NO_ITEM:
        return ColorState.delivery;

      case ProductStatus.VIOLATE:
        return ColorState.error;

      case ProductStatus.PENDING:
        return ColorState.warning;

      case ProductStatus.SELLING:
        return ColorState.success;

      case ProductStatus.OFF:
        return ColorState.grey;
    }
  };

  const setLabelByStatus = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.NO_ITEM:
        return "Hết hàng";

      case ProductStatus.VIOLATE:
        return "Vi phạm";

      case ProductStatus.PENDING:
        return "Chờ duyệt";

      case ProductStatus.SELLING:
        return "Đang bán";

      case ProductStatus.OFF:
        return "Đã tắt";
    }
  };

  return (
    <div
      className={`flex ${width ?? "w-fit "} ${height ?? "h-fit "} ${px ?? "px-3"} ${py ?? "py-1"} ${status ? setColorByStatus(status) : bgColor ? bgColor : "bg-primary-c800"} items-center justify-center rounded-full`}
    >
      <div className="font-semibold">
        {status ? setLabelByStatus(status) : ""}
      </div>
    </div>
  );
};

export default MyStatus;
