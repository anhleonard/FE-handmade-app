import { COLORS } from "@/enum/colors";
import React from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import { Auction } from "@/enum/defined-type";
import { Role } from "@/enum/constants";

type Props = {
  auction: Auction;
};

const CanceledInformation = ({ auction }: Props) => {
  const renderCancelPerson = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "Ban quản trị";
      case Role.SELLER:
        return "Tôi";
      case Role.USER:
        return "Khách hàng";
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <PersonOutlineRoundedIcon
            sx={{ fontSize: 22, color: COLORS.grey.c800 }}
          />
          <div className="font-bold text-grey-c900">Người hủy</div>
        </div>
        <div className="text-sm text-grey-c900">
          {renderCancelPerson(auction?.canceledBy?.role as Role)}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <QuestionMarkOutlinedIcon
            sx={{ fontSize: 20, color: COLORS.grey.c800 }}
          />
          <div className="font-bold text-grey-c900">Lý do hủy</div>
        </div>
        <div className="text-justify text-sm text-grey-c900">
          {auction?.additionalComment}
        </div>
      </div>
    </div>
  );
};

export default CanceledInformation;
