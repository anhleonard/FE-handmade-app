import { headerUrl } from "@/apis/services/authentication";
import { singleStore } from "@/apis/services/stores";
import storage from "@/apis/storage";
import EditStoreModal from "@/components/profile/edit-store-modal";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Store, User } from "@/enum/defined-type";
import { SCREEN } from "@/enum/setting";
import Button from "@/libs/button";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import EditSellerModal from "@/components/profile/edit-seller-modal";

const SellerProfile = () => {
  const dispatch = useDispatch();
  const [seller, setSeller] = useState<User>();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const getSingleStore = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res: Store = await singleStore(token);
      if (res) {
        setSeller(res?.owner);
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
    getSingleStore();
  }, [refetchQueries]);

  const handleOpenEditModal = () => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa thông tin",
      content: seller && (
        <EditSellerModal seller={seller} handleRefetch={handleRefetch} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="grid w-full grid-cols-12 gap-8 divide-x-[2px] divide-grey-c50">
        <div className="col-span-8 flex flex-col gap-6 text-grey-c900">
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Tên chủ shop</div>
            <div className="col-span-9 font-semibold">{seller?.name}</div>
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Email</div>
            <div className="col-span-9 font-semibold">{seller?.email}</div>
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Số điện thoại</div>
            <div className="col-span-9 text-justify font-semibold">
              {seller?.phoneNumber}
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => handleOpenEditModal()}>Chỉnh sửa</Button>
    </div>
  );
};

export default SellerProfile;
