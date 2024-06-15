import { COLORS } from "@/enum/colors";
import { Tooltip } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import StraightOutlinedIcon from "@mui/icons-material/StraightOutlined";

type FinancialParamCardProps = {
  className?: string;
  title?: string;
  amountMoney?: string;
  compare?: string;
  status?: "increase" | "decrease";
  explaination?: string;
};

const FinancialParamCard = ({
  className = "",
  title = "",
  amountMoney = "",
  status = "increase",
  compare = "",
  explaination = "",
}: FinancialParamCardProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-row items-center gap-2">
        <div className="font-semibold">{title}</div>
        <Tooltip title={explaination} className="hover:cursor-pointer">
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: 16, color: COLORS.grey.c700 }}
          />
        </Tooltip>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-bold">{amountMoney} đ</div>
        <div className="flex flex-row items-center gap-1">
          <div className="text-xs">So với 7 ngày trước: </div>
          <div className="flex flex-row items-center">
            <StraightOutlinedIcon
              sx={{
                fontSize: 16,
                color:
                  status === "decrease"
                    ? COLORS.primary.c900
                    : COLORS.success.c900,
                transform: status === "decrease" ? "rotate(180deg)" : "none",
              }}
            />
            <div
              className={`font-bold ${status === "decrease" ? "text-primary-c900" : "text-success-c900"}`}
            >
              {compare}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialParamCard;
