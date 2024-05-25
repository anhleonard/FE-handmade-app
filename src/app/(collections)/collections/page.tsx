"use client";
import { storeCollections } from "@/apis/services/collections";
import storage from "@/apis/storage";
import DefaultLayout from "@/components/layouts/default-layout";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Collection, Product } from "@/enum/defined-type";
import { EditIcon, SearchIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateCollectionModal from "../update-collection/[id]/page";
import { allStoreProducts } from "@/apis/services/stores";
import { openModal } from "@/redux/slices/modalSlice";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getAllStoreCollections = async () => {
    try {
      dispatch(openLoading());
      const sellerId = storage.getLocalUserId();

      const query = {
        ...(title !== "" && {
          title: title,
        }),
      };

      const res = await storeCollections(+sellerId, query);

      if (res) {
        setCollections(res);
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

  // get all seller products by seller token
  const getAllSellerProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res: Product[] = await allStoreProducts(token);
      if (res) {
        setProducts(res);
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
    getAllStoreCollections();
    getAllSellerProducts();
  }, [refetchQueries]);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleOpenEditModal = (collection: Collection) => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa bộ sưu tập",
      content: (
        <UpdateCollectionModal
          collection={collection}
          allProducts={products}
          handleRefetch={handleRefetch}
        />
      ),
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  return (
    <DefaultLayout>
      <div className="w-full rounded-lg bg-white px-8 py-4">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Danh sách bộ sưu tập
          </div>

          <MyTextField
            id="searchItem"
            endIcon={
              <div onClick={() => handleRefetch()}>
                <SearchIcon />
              </div>
            }
            placeholder="Nhập nội dung tìm kiếm"
            className="w-[300px]"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="max-w-[100%] overflow-hidden rounded-[10px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-auto text-left text-sm">
              <thead
                className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
              >
                <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                  <th className="py-4 pl-3">Tên bộ sưu tập</th>
                  <th className="px-1 py-4">Số sản phẩm</th>
                  <th className="px-1 py-4 text-center">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {collections?.map((collect: Collection, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-primary-c100 hover:text-grey-c700"
                    >
                      <td className="py-4 pl-3">{collect?.name}</td>
                      <td className="px-1 py-4">{collect?.products?.length}</td>
                      <td className="px-1 py-4">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <Tooltip title="Chỉnh sửa">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => handleOpenEditModal(collect)}
                            >
                              <EditIcon />
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CollectionsPage;
