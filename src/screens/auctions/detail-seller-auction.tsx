"use client";
import React, { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { COLORS } from "@/enum/colors";
import DetailAuction from "@/components/auctions/detail-auction";
import { useRouter } from "next/navigation";
import UpdateWorkForm from "@/components/auctions/seller-auctions/update-work-form";
import ContentUpdatedWork from "@/components/auctions/seller-auctions/content-updated-work";
import RatingAuction from "@/components/auctions/seller-auctions/rating-auction";
import CanceledInformation from "@/components/auctions/seller-auctions/canceled-information";
import { AlertState, Auction } from "@/enum/defined-type";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleAuction } from "@/apis/services/auctions";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import RandomAuctions from "@/components/auctions/random-auctions";

type Props = {
  auctionId: number;
};

const MyDetailSellerAuctionScreen = ({ auctionId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const [auction, setAuction] = useState<Auction>();

  const getSingleAuction = async () => {
    try {
      dispatch(openLoading());
      const res = await singleAuction(auctionId);
      if (res) {
        setAuction(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getSingleAuction();
  }, [refetchQueries]);

  if (!auction) return null;

  const selectedBidder = auction?.candidates?.filter(
    (bidder) => bidder.isSelected === true,
  )[0];

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="w-full rounded-lg bg-white px-8 py-4">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <div onClick={() => router.back()}>
            <ArrowBackRoundedIcon
              sx={{ fontSize: 20, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </div>
          <div className="text-lg font-bold text-grey-c900">
            Thông tin đơn đấu giá{" "}
            <span className="text-primary-c900">#{auction?.id}</span>
          </div>
        </div>
        <div className="grid gap-[50px] md:grid-cols-5 md:gap-[30px]">
          <div className="flex flex-col gap-9 md:col-span-4">
            {/* DETAIL INFOR OF AUCTION */}
            <DetailAuction
              auction={auction}
              status={auction?.status as AuctionStatus}
              bidder={selectedBidder}
              handleRefetch={handleRefetch}
            />

            {/* FORM UPDATED WORK */}
            {auction?.status === AuctionStatus.PROGRESS &&
              !auction?.readyToLaunch && (
                <UpdateWorkForm
                  auction={auction}
                  handleRefetch={handleRefetch}
                />
              )}

            {/* LIST COMMENT FOR WORK */}
            {auction?.status !== AuctionStatus.CANCELED && (
              <div className="space-y-8">
                {auction?.progresses?.length
                  ? auction?.progresses
                      ?.sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((progress) => {
                        if (!progress) return null;
                        return (
                          <ContentUpdatedWork
                            key={progress?.id}
                            status={auction?.status as AuctionStatus}
                            progress={progress}
                            handleRefetch={handleRefetch}
                          />
                        );
                      })
                  : null}
              </div>
            )}

            {/* RATING BY CLIENT */}
            {/* {auction?.status === AuctionStatus.COMPLETED && (
              <RatingAuction type="seller" />
            )} */}

            {/* CANCEL INFORMATION */}
            {auction?.status === AuctionStatus.CANCELED && (
              <CanceledInformation auction={auction} />
            )}
          </div>
          <div className="flex flex-col gap-4 md:col-span-1">
            <RandomAuctions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetailSellerAuctionScreen;
