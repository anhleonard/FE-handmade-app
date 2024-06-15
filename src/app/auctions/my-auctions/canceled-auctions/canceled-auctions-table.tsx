import { allSellerAuctions } from "@/apis/services/auctions";
import storage from "@/apis/storage";
import SellerAunctionCard from "@/components/auctions/seller-auctions/seller-auctions-card";
import NoItemCard from "@/components/no-item/no-item-card";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CanceledAuctionsTab = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const getSellerAuctionsByStatus = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        status: AuctionStatus.CANCELED,
      };
      const res = await allSellerAuctions(token, variables);
      if (res) {
        setAuctions(res);
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
    getSellerAuctionsByStatus();
  }, []);

  return (
    <div className="space-y-8">
      {auctions?.map((auction, index) => {
        return (
          <SellerAunctionCard
            key={index}
            auction={auction}
            status={auction?.status as AuctionStatus}
          />
        );
      })}
      {!auctions?.length && (
        <NoItemCard title="Bạn không có dự án nào ở đây!" />
      )}
    </div>
  );
};

export default CanceledAuctionsTab;
