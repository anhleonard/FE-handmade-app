import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyLabel from "@/libs/label";
import {
  calculateDaysAfterAccepted,
  findMaxPercentage,
  formatCurrency,
} from "@/enum/functions";
import Button from "@/libs/button";
import { useRouter } from "next/navigation";
import { AuctionStatus } from "@/enum/constants";
import { Auction } from "@/enum/defined-type";

type SellerAunctionCardProps = {
  auction: Auction;
  status: AuctionStatus;
};

const SellerAunctionCard = ({ auction, status }: SellerAunctionCardProps) => {
  const router = useRouter();

  const bidder = auction?.candidates?.filter(
    (bidder) => bidder.isSelected === true,
  )[0];

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50">
      <ListItem
        className={`rounded-tl-2xl rounded-tr-2xl border-b-[2px] border-grey-c50 bg-white`}
        disablePadding
      >
        <div className="flex w-full flex-row items-center justify-between px-4 py-4">
          <div className="flex flex-row items-center gap-2">
            <div className="text-base font-semibold text-primary-c900">
              {auction?.name}
            </div>
          </div>
          <Button
            className="!w-fit !px-3 !py-1.5"
            onClick={() => router.push(`/auctions/my-auctions/${auction?.id}`)}
          >
            <span className="text-xs font-medium">Xem chi tiết</span>
          </Button>
        </div>
      </ListItem>
      <Collapse in>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          {/* item 1 */}
          <ListItem className="block w-full" disablePadding>
            <div className="grid grid-cols-3 gap-9 md:grid-cols-4 lg:grid-cols-5">
              {/* left content */}
              <div className="col-span-2 flex flex-col gap-1 md:col-span-3 lg:col-span-4">
                <div className="text-base font-bold text-grey-c900">
                  Mô tả chi tiết
                </div>
                <div className="line-clamp-4 text-justify text-sm font-normal text-grey-c900">
                  {auction?.description}
                </div>
              </div>
              {/* right content */}
              <div className="col-span-1 flex flex-col gap-3">
                <div className="text-xs font-bold text-grey-c900">
                  Giá chốt:{" "}
                  <span className="text-xs font-bold text-primary-c900">
                    {formatCurrency(bidder?.bidderMoney)}
                  </span>
                </div>
                {status === AuctionStatus.PROGRESS && (
                  <div className="text-xs font-bold text-grey-c900">
                    Hạn:{" "}
                    <span className="text-xs font-bold text-primary-c900">
                      còn{" "}
                      {calculateDaysAfterAccepted(
                        bidder?.estimatedDay,
                        bidder?.acceptedAt,
                      )}{" "}
                      ngày
                    </span>
                  </div>
                )}
                {status === AuctionStatus.PROGRESS ? (
                  <div className="flex flex-row items-center gap-1">
                    <div className="text-xs font-bold text-grey-c900">
                      Tiến độ:
                    </div>
                    <div className="text-xs font-bold text-primary-c900">
                      {findMaxPercentage(auction?.progresses)}%
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-bold text-grey-c900">
                    Trạng thái:{" "}
                  </div>
                  {status === AuctionStatus.PROGRESS && (
                    <MyLabel type="progress">Đang tiến hành</MyLabel>
                  )}
                  {status === AuctionStatus.COMPLETED && (
                    <MyLabel type="success">Đã hoàn thành</MyLabel>
                  )}
                  {status === AuctionStatus.CANCELED && (
                    <MyLabel type="error">Đã hủy</MyLabel>
                  )}
                  {status === AuctionStatus.DELIVERY && (
                    <MyLabel type="delivery">Đang vận chuyển</MyLabel>
                  )}
                  {status === AuctionStatus.SENT_SELLER && (
                    <MyLabel type="warning">Chờ nhận</MyLabel>
                  )}
                </div>
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default SellerAunctionCard;
