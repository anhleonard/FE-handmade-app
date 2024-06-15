"use client";

import DefaultLayout from "@/components/layouts/default-layout";
import MyDetailSellerAuctionScreen from "@/screens/auctions/detail-seller-auction";
import { useParams } from "next/navigation";
import React from "react";

const MyListAuctions = () => {
  const params = useParams();

  const auctionId = params?.id;

  return (
    <DefaultLayout>
      {auctionId && typeof auctionId === "string" && (
        <MyDetailSellerAuctionScreen auctionId={parseInt(auctionId)} />
      )}
    </DefaultLayout>
  );
};

export default MyListAuctions;
