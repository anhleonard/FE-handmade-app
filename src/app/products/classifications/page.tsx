"use client";

import DefaultLayout from "@/components/layouts/default-layout";
import CreateVariantCategoriesModal from "@/components/products/create-variant-categories";
import { SCREEN } from "@/enum/setting";
import Button from "@/libs/button";
import { openModal } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";

const ClassificationPage = () => {
  const dispatch = useDispatch();

  const handleOpenCreateModal = () => {
    const modal = {
      isOpen: true,
      title: "Tạo phân loại",
      content: <CreateVariantCategoriesModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <DefaultLayout>
      <div className="w-full space-y-4 rounded-lg bg-white px-4 pb-4 pt-2">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Phân loại sản phẩm
          </div>
        </div>
        <Button
          className="!px-3 !text-xs"
          onClick={() => handleOpenCreateModal()}
        >
          Thêm phân loại
        </Button>
        <div>Danh sách phân loại</div>
      </div>
    </DefaultLayout>
  );
};

export default ClassificationPage;
