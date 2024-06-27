"use client";
import { randomAuctions } from "@/apis/services/auctions";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import { formatCurrency } from "@/enum/functions";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading } from "@/redux/slices/loadingSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RandomAuctions = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const getRandomAuctions = async () => {
    try {
      const res = await randomAuctions();
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
    getRandomAuctions();
  }, []);
  return (
    <>
      <div className="font-bold text-grey-c900">Các dự án khác</div>
      {auctions?.length
        ? auctions?.map((auction, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <Link
                  href={`/detail-auction/${auction?.id}`}
                  className="text-base font-bold text-grey-c900 hover:cursor-pointer hover:text-primary-c900 hover:underline"
                >
                  {auction?.name}
                </Link>
                <div className="text-sm">
                  {formatCurrency(auction?.maxAmount)}
                </div>
              </div>
            );
          })
        : null}
      {!auctions?.length ? (
        <div className="text-center text-sm font-medium text-grey-c900">
          Không có dự án nào!
        </div>
      ) : null}
    </>
  );
};

export default RandomAuctions;
