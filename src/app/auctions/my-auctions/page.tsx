"use client";
import storage from "@/apis/storage";
import DefaultLayout from "@/components/layouts/default-layout";
import MyAuctionsScreen from "@/screens/auctions/seller-list-auctions";
import React, { useState } from "react";

const MyListAuctions = () => {
  const tabId = storage.getAuctionTab();
  const [value, setValue] = useState<string>(tabId ? tabId : "1");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    storage.updateAuctionTab(newValue.toString());
    setValue(newValue.toString());
  };

  return (
    <DefaultLayout>
      <MyAuctionsScreen value={value} handleChange={handleChange} />
    </DefaultLayout>
  );
};

export default MyListAuctions;
