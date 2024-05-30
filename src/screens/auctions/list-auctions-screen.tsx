import AunctionCard from "@/components/auctions/aunction-card";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import MyTextField from "@/libs/text-field";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useEffect, useState } from "react";
import SidebarAuctionFilters from "./sidebar-auction-filters";

import { AlertStatus } from "@/enum/constants";
import { useDispatch, useSelector } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { AlertState, Auction, FilterTime } from "@/enum/defined-type";
import { filterAuctions } from "@/apis/services/auctions";

const ListAuctionsScreen = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [completedTime, setCompletedTime] = useState<FilterTime>();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [title, setTitle] = useState<string>("");

  const getAllFilterAuctions = async () => {
    try {
      dispatch(openLoading());
      const query = {
        ...(completedTime &&
          completedTime?.min && {
            minDay: completedTime?.min,
          }),
        ...(completedTime &&
          completedTime?.max && {
            maxDay: completedTime?.max,
          }),
        ...(minPrice !== "" && {
          minPrice: parseInt(minPrice),
        }),
        ...(maxPrice !== "" && {
          maxPrice: parseInt(maxPrice),
        }),
        ...(title !== "" && {
          title: title,
        }),
      };

      const res = await filterAuctions(query);
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
    getAllFilterAuctions();
  }, [refetchQueries]);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="w-full rounded-lg bg-white px-8 py-4">
      <div className="mb-5 flex flex-col gap-6">
        <div className="text-lg font-bold text-grey-c900">
          Thị trường đấu giá
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="md:col-span-4">
            <MyTextField
              id="auction-search-field"
              placeholder="Nhập keyword mà bạn muốn tìm kiếm"
              onChange={(event) => setTitle(event.target.value)}
              endIcon={
                <div onClick={() => getAllFilterAuctions()}>
                  <SearchRoundedIcon sx={{ color: COLORS.grey.c400 }} />
                </div>
              }
            />
          </div>
          <Button color="info">Dự án của tôi</Button>
        </div>
        {/* main content */}
        <div className="flex flex-col lg:flex-row">
          <div className="pr-4 lg:w-1/3 xl:w-1/4">
            <SidebarAuctionFilters
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              completedTime={completedTime}
              setCompletedTime={setCompletedTime}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              handleRefetch={handleRefetch}
            />
          </div>
          <div className="mb-10 flex-shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0"></div>
          <div className="flex-1 space-y-8">
            {auctions?.map((auction, index) => {
              return <AunctionCard key={index} auction={auction} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAuctionsScreen;
