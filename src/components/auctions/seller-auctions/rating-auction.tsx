import React from "react";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { COLORS } from "@/enum/colors";
import { Rating } from "@mui/material";
import MyTextArea from "@/libs/text-area";
import Button from "@/libs/button";

type RatingAuctionProps = {
  type?: "client" | "seller";
};

const RatingAuction = ({ type = "client" }: RatingAuctionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-2">
        <TaskAltRoundedIcon sx={{ fontSize: 22, color: COLORS.grey.c800 }} />
        <div className="font-bold text-grey-c900">Đánh giá</div>
      </div>
      {type === "client" && (
        <>
          <div className="flex flex-row items-center gap-2">
            <div className="text-sm text-grey-c900">Số sao:</div>
            <Rating sx={{ fontSize: 20 }} />
          </div>
          <div className="flex flex-col items-end gap-3">
            <MyTextArea
              id={Math.random().toString()}
              title="Nội dung đánh giá"
              isRequired
              placeholder="Viết đánh giá của bạn về dự án và handmader"
            />
            <Button className="!w-fit" color="primary">
              <span className="text-sm font-medium">Thêm</span>
            </Button>
          </div>
        </>
      )}
      {type === "seller" && (
        <>
          <Rating
            name="size-small"
            defaultValue={2}
            sx={{ fontSize: 20 }}
            readOnly
          />
          <div className="text-justify text-sm text-grey-c900">
            Ratings provide insight regarding others opinions and experiences,
            and can allow the user to submit a rating of their own. Ratings
            provide insight regarding others opinions and experiences, and can
            allow the user to submit a rating of their own.
          </div>
        </>
      )}
    </div>
  );
};

export default RatingAuction;
