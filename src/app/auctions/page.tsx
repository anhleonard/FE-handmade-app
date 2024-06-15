"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import ListAuctionsScreen from "@/screens/auctions/list-auctions-screen";

const MainListAuctions = () => {
  return (
    <DefaultLayout>
      <ListAuctionsScreen />
    </DefaultLayout>
  );
};

export default MainListAuctions;
