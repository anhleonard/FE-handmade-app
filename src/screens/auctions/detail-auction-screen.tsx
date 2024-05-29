import React, { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { COLORS } from "@/enum/colors";
import DetailAuction from "@/components/auctions/detail-auction";
import { useParams, useRouter } from "next/navigation";
import SellerAuctionInformation from "@/components/auctions/seller-auction-information";
import ListSellerPrice from "./list-seller-price";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleAuction } from "@/apis/services/auctions";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { AlertState, Auction } from "@/enum/defined-type";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";

type Props = {
  auctionId: string;
};

const DetailAuctionsScreen = ({ auctionId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const [auction, setAuction] = useState<Auction>();

  const getSingleAuction = async () => {
    try {
      dispatch(openLoading());
      const res = await singleAuction(parseInt(auctionId));
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

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="w-full rounded-lg bg-white px-8 py-4">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <Link href={"/auctions"}>
            <ArrowBackRoundedIcon
              sx={{ fontSize: 20, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </Link>
          <div className="text-lg font-bold text-grey-c900">
            Thông tin đơn đấu giá{" "}
            <span className="text-primary-c900">#{auction?.id}</span>
          </div>
        </div>
        <div className="grid gap-[50px] md:grid-cols-5 md:gap-[30px]">
          <div className="flex flex-col gap-9 md:col-span-4">
            {auction && (
              <DetailAuction
                auction={auction}
                status={auction?.status as AuctionStatus}
                handleRefetch={handleRefetch}
              />
            )}
            {auction && (
              <SellerAuctionInformation
                auction={auction}
                handleRefetch={handleRefetch}
              />
            )}
            {auction && <ListSellerPrice auction={auction} />}
          </div>
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="font-bold text-grey-c900">Các dự án khác</div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-grey-c900 hover:cursor-pointer hover:underline">
                Large-scale Oracle to MySQL Conversion
              </div>
              <div className="text-sm">$100 - $200</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-grey-c900 hover:cursor-pointer hover:underline">
                Large-scale Oracle to MySQL Conversion
              </div>
              <div className="text-sm">$100 - $200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAuctionsScreen;
