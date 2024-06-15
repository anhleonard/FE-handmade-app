"use client";

import React, { useState } from "react";
import MySwitchButton from "@/libs/switch-button";
import MyLabel from "@/libs/label";
import Button from "@/libs/button";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Radio from "@/libs/single-radio";
import { DATA_COMPLETED_TIME } from "@/enum/constants";
import { FilterTime } from "@/enum/defined-type";

type Props = {
  isOpen: boolean;
  setIsOpen: any;
  completedTime?: FilterTime;
  setCompletedTime: any;
  setMinPrice: any;
  setMaxPrice: any;
  handleRefetch: () => void;
};

const SidebarAuctionFilters = ({
  isOpen,
  setIsOpen,
  completedTime,
  setCompletedTime,
  setMinPrice,
  setMaxPrice,
  handleRefetch,
}: Props) => {
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col space-y-5 pb-8">
        <div className="space-y-5">
          <span className="font-semibold">Khoảng giá</span>
          <div className="flex flex-row items-center gap-2">
            <MyPrimaryTextField
              id="MIN"
              type="number"
              placeholder="MIN"
              inputClassName="rounded-full !border-[1px]"
              onChange={(event) => setMinPrice(event.target.value)}
            ></MyPrimaryTextField>
            <MyPrimaryTextField
              id="MAX"
              type="number"
              placeholder="MAX"
              inputClassName="rounded-full !border-[1px]"
              onChange={(event) => setMaxPrice(event.target.value)}
            ></MyPrimaryTextField>
          </div>
        </div>
      </div>
    );
  };

  const renderCompletedTime = () => {
    return (
      <div className="relative flex flex-col space-y-4 py-8">
        <h3 className="mb-2.5 font-semibold">Khoảng thời gian</h3>
        {DATA_COMPLETED_TIME.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioCompletedTime"
            label={item.name}
            defaultChecked={completedTime?.id === item.id}
            sizeClassName="w-5 h-5"
            className="!text-sm"
            onChange={(value) => {
              const date = DATA_COMPLETED_TIME.filter(
                (item) => item.id === value,
              );
              setCompletedTime(date[0]);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsPriceRage()}
      {renderCompletedTime()}
      <div className="py-8">
        <h3 className="mb-5 font-semibold">Trạng thái</h3>
        <div className="flex flex-row items-center justify-between">
          {isOpen ? (
            <MyLabel type="success">
              <span className="py-1 font-bold">Đang mở</span>
            </MyLabel>
          ) : (
            <MyLabel type="error">
              <span className="py-1 font-bold">Đã đóng</span>
            </MyLabel>
          )}
          <MySwitchButton
            checked={true}
            handleClickSwitchButton={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Button
        className="!w-full !px-3 !py-2"
        color="info"
        onClick={() => handleRefetch()}
      >
        Lọc
      </Button>
    </div>
  );
};

export default SidebarAuctionFilters;
