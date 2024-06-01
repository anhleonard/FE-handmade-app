"use client";
import {
  AlertStatus,
  Page,
  ProductStatus,
  mainCategories,
  rowsPerPage,
} from "@/enum/constants";
import {
  DeleteIcon,
  DetailIcon,
  EditIcon,
  SearchIcon,
  TurnOnIcon,
} from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import {
  deleteProduct,
  filterSellerProducts,
  getOffProducts,
  updateProductBySeller,
} from "@/apis/services/product";
import { useEffect, useState } from "react";
import { AlertState, Product } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { RootState } from "@/redux/store";
import { headerUrl } from "@/apis/services/authentication";
import { formatCurrency } from "@/enum/functions";
import DetailProductModal from "../../modals/detail-product-modal";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { MyPagination } from "@/libs/pagination";
import MyLabel from "@/libs/label";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const OffItemsTable = () => {
  const dispatch = useDispatch();
  const [offProducts, setOffProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [searchText, setSearchText] = useState<string>("");

  const handleOpenDetailModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm",
      content: (
        <DetailProductModal type={ProductStatus.OFF} productId={productId} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  // get all seller products by seller token
  const getAllSellerProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await filterSellerProducts(token, {
        limit: rowsPage,
        page: page,
        status: ProductStatus.OFF,
        ...(selectedOption === labelOptions[0] &&
          searchText !== "" && {
            productName: searchText,
          }),
        ...(selectedOption === labelOptions[1] &&
          searchText !== "" && {
            productCode: searchText,
          }),
      });
      setCount(res?.total ?? 0);
      setOffProducts(res?.data);
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
    getAllSellerProducts();
  }, [refetchQueries, page, rowsPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleRowPerPageChange = (e: any) => {
    setPage(Page);
    setRowsPage(parseInt(e.target.value));
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleConfirmDeleteItem = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÓA SẢN PHẨM",
      message: "Bạn có chắc chắn xóa sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const res = await handleDeleteProduct(id); //call api to delete product
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "XÓA THÀNH CÔNG",
              message: "Đã xóa sản phẩm thành công",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
            dispatch(refetchComponent());
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
      },
    };

    dispatch(openConfirm(confirm));
  };

  const handleDeleteProduct = async (id: number) => {
    const token = storage.getLocalAccessToken();
    return await deleteProduct(id, token);
  };

  const handleConfirmActiveItem = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "BẬT SẢN PHẨM",
      message: "Bạn có chắc chắn bật sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const token = storage.getLocalAccessToken();
          const variables = {
            status: ProductStatus?.SELLING,
          };
          const res = await updateProductBySeller(id, variables, token);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Sản phẩm đã được bật bán trở lại",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
            dispatch(refetchComponent());
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
      },
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect
            options={labelOptions}
            selected={selectedOption.value}
            onSelectItem={(item: Item) => setSelectedOption(item)}
          />
          <form
            className="flex-1 text-slate-900 dark:text-slate-100"
            onSubmit={(e) => {
              handleRefetch();
              e.preventDefault();
            }}
          >
            <MyTextField
              id="searchItem"
              endIcon={<SearchIcon />}
              placeholder="Nhập nội dung tìm kiếm"
              className="w-[300px]"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
      </div>

      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã sản phẩm</th>
                <th className="px-1 py-4">Sản phẩm</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {offProducts?.map((product: Product, index: number) => {
                return (
                  <tr
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                    key={index}
                  >
                    <td className="py-4 pl-3">{product.productCode}</td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                            {product.productName}
                          </div>
                          <div>
                            <span className="text-[10px]">Đã bán:</span>{" "}
                            <span className="text-[10px] font-bold text-primary-c900">
                              {product.soldNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      <MyLabel type="grey">Đã tắt</MyLabel>
                    </td>
                    <td className="px-1 py-4">{product?.inventoryNumber}</td>
                    <td className="px-1 py-4">
                      {product?.price ? (
                        formatCurrency(product?.price)
                      ) : (
                        <div className="flex flex-row items-center justify-center">
                          -
                        </div>
                      )}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(product?.id)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                          <div className="hover:cursor-pointer">
                            <EditIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleConfirmDeleteItem(product?.id)}
                          >
                            <DeleteIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Bật sản phẩm">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleConfirmActiveItem(product?.id)}
                          >
                            <TurnOnIcon />
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
      <MyPagination
        page={page}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
        total={count}
        rowsPerPage={rowsPage}
      />
    </div>
  );
};

export default OffItemsTable;
