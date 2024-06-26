"use client";

import { getVariantCategoriesByUser } from "@/apis/services/variant-category";
import storage from "@/apis/storage";
import DefaultLayout from "@/components/layouts/default-layout";
import CreateVariantCategoriesModal from "@/components/products/create-variant-categories";
import UpdateVariantCategoriesModal from "@/components/products/update-variant-categories";
import { AlertStatus } from "@/enum/constants";
import { AlertState, VariantCategory } from "@/enum/defined-type";
import { SCREEN } from "@/enum/setting";
import Button from "@/libs/button";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClassificationPage = () => {
  const dispatch = useDispatch();
  const [variantCategories, setVariantCategories] = useState<VariantCategory[]>(
    [],
  );
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const handleOpenCreateModal = () => {
    const modal = {
      isOpen: true,
      title: "Tạo phân loại",
      content: <CreateVariantCategoriesModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const getListVariantCategories = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await getVariantCategoriesByUser(token);
      if (res) {
        setVariantCategories(res);
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
    getListVariantCategories();
  }, [refetchQueries]);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleUpdateModal = (variantCategory: VariantCategory) => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa phân loại",
      content: (
        <UpdateVariantCategoriesModal
          variantCategory={variantCategory}
          handleRefetch={handleRefetch}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <DefaultLayout>
      <div className="w-full space-y-4 rounded-lg bg-white px-4 pb-4 pt-2">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Danh sách phân loại
          </div>
        </div>
        <Button
          className="!px-3 !text-xs"
          onClick={() => handleOpenCreateModal()}
        >
          Thêm phân loại
        </Button>
        <div className="grid grid-cols-2 gap-6">
          {variantCategories?.length
            ? variantCategories?.map((variantCategory, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-xl border-[2px] border-grey-c50 px-4"
                  >
                    <div className="flex flex-row items-center justify-between border-b-2 border-grey-c50 px-2 py-4 text-grey-c900">
                      <div className="text-sm font-bold">
                        {variantCategory?.variantName}
                      </div>
                      <Button
                        className="!px-3 !py-2 !text-xs"
                        onClick={() => handleUpdateModal(variantCategory)}
                      >
                        Thêm
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3 py-4">
                      {variantCategory?.variantItems?.length
                        ? variantCategory?.variantItems?.map((item, index) => {
                            return (
                              <Chip
                                key={index}
                                color="primary"
                                label={item?.name}
                                className="bg-blue-c900 font-semibold"
                              />
                            );
                          })
                        : null}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ClassificationPage;
