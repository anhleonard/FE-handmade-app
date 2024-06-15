"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import DetailAuctionsScreen from "@/screens/auctions/detail-auction-screen";
import { useParams } from "next/navigation";

const MainDetailAuction = () => {
  const params = useParams();
  const auctionId = params?.id_auction;

  return (
    <DefaultLayout>
      <DetailAuctionsScreen auctionId={auctionId as string} />
    </DefaultLayout>
  );
};

export default MainDetailAuction;
