import { StoreStatus } from "@/enum/constants";
import { Store } from "@/enum/defined-type";
import { SCREEN } from "@/enum/setting";
import Button from "@/libs/button";
import MyLabel from "@/libs/label";
import { openModal } from "@/redux/slices/modalSlice";
import React from "react";
import { useDispatch } from "react-redux";
import ChangeStoreModal from "./change-store-modal";

type Props = {
  store?: Store;
};

const InactiveStorePage = ({ store }: Props) => {
  const dispatch = useDispatch();

  const handleOpenEditModal = () => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa cửa hàng",
      content: <ChangeStoreModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenReasonModal = (reason: string) => {
    const modal = {
      isOpen: true,
      title: "Lý do từ chối",
      content: (
        <div className="py-4 text-justify font-medium text-support-c500">
          {reason}
        </div>
      ),
      screen: SCREEN.SM,
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-grey-c900">
      <img
        src="/images/inactive-store.svg"
        alt="inactive-store"
        style={{ width: 300, height: 200 }}
      />

      {store?.status === StoreStatus.INACTIVE ? (
        store?.notApproveReason ? (
          <div className="flex flex-col items-center gap-2">
            <MyLabel type="error">Không được duyệt</MyLabel>
            <div>Cửa hàng không được duyệt để hoạt động</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <MyLabel type="warning">Chờ duyệt</MyLabel>
            <div>
              Cửa hàng chưa được duyệt để hoạt động. Vui lòng quay lại sau.
            </div>
          </div>
        )
      ) : null}

      {store?.status === StoreStatus.INACTIVE && store?.notApproveReason ? (
        <div className="grid w-[560px] grid-cols-2 gap-8">
          <Button
            className="!w-full"
            color="black"
            onClick={() => handleOpenReasonModal(store?.notApproveReason)}
          >
            Xem lí do
          </Button>
          <Button className="!w-full" onClick={() => handleOpenEditModal()}>
            Chỉnh sửa thông tin
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default InactiveStorePage;
