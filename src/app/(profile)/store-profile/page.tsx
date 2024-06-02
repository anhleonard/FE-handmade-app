import { headerUrl } from "@/apis/services/authentication";
import { singleStore } from "@/apis/services/stores";
import storage from "@/apis/storage";
import EditStoreModal from "@/components/profile/edit-store-modal";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Store } from "@/enum/defined-type";
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

const StoreProfile = () => {
  const dispatch = useDispatch();
  const [store, setStore] = useState<Store>();
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
        setStore(res);
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
      content: store && (
        <EditStoreModal store={store} handleRefetch={handleRefetch} />
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
            <div className="col-span-3 font-medium">Tên shop</div>
            <div className="col-span-9 font-semibold">{store?.name}</div>
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Ngành hàng chủ lực</div>
            <div className="col-span-9 font-semibold">
              {store?.mainBusiness}
            </div>
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Mô tả</div>
            <div className="col-span-9 text-justify font-semibold">
              {store?.description}
            </div>
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3 font-medium">Địa chỉ</div>
            <div className="col-span-9 text-justify font-semibold">
              {store?.address}
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col items-center justify-center gap-4">
          <div className="text-sm font-semibold uppercase">Shop logo</div>
          <Avatar
            src={store?.avatar ? `${headerUrl}/products/${store?.avatar}` : ""}
            alt="shop-logo"
            style={{ width: "120px", height: "120px" }}
            className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          />
        </div>
      </div>
      <Button onClick={() => handleOpenEditModal()}>Chỉnh sửa</Button>
    </div>
  );
};

export default StoreProfile;
