import {
  BgColor,
  BorderColor,
  FOCUS,
  FontFamily,
  FontSize,
  TextColor,
} from "@/enum/setting";
import Typography from "./typography";
import { ReactNode, useMemo } from "react";

type MyDefaultTextProps = {
  title?: string;
  wrapClassName?: string;
  children?: ReactNode;
  type?: "disabled" | "error" | "success";
};

const MyDefaultText = ({
  title,
  wrapClassName = "",
  children,
  type = "disabled",
}: MyDefaultTextProps) => {
  const colorAttitude = useMemo(() => {
    return {
      disabled: {
        textColor: TextColor.GREY_700,
        borderColor: BorderColor.GREY_200,
        bgColor: BgColor.GREY_100,
      },
      error: {
        textColor: TextColor.SUPPORT_500,
        borderColor: BorderColor.SUPPORT_500,
        bgColor: BgColor.SUPPORT_10,
      },
      success: {
        textColor: TextColor.SUCCESS_900,
        borderColor: BorderColor.SUCCESS_700,
        bgColor: BgColor.SUCCESS_50,
      },
      // Thêm các loại khác nếu cần
    };
  }, []);

  const currentType = colorAttitude[type] || colorAttitude.disabled;

  return (
    <div className={wrapClassName}>
      {title && (
        <div className="mb-1 block text-sm font-medium text-grey-c600">
          {title}
        </div>
      )}
      <div
        className={`relative min-h-[52px] rounded-2xl border-[2px] px-3 py-2 ${currentType.borderColor} ${currentType.bgColor}`}
      >
        <Typography
          textColor={currentType.textColor}
          fontSize={FontSize.BASE}
          fontFamily={type === "error" ? FontFamily.MEDIUM : FontFamily.NORMAL}
          className="text-justify text-base"
        >
          {children}
        </Typography>
      </div>
    </div>
  );
};

export default MyDefaultText;
