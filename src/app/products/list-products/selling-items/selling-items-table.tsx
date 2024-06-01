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
  OffIcon,
  SearchIcon,
} from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import {
  filterSellerProducts,
  updateProductBySeller,
} from "@/apis/services/product";
import storage from "@/apis/storage";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useEffect, useState } from "react";
import { AlertState, Product } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { RootState } from "@/redux/store";
import { headerUrl } from "@/apis/services/authentication";
import { formatCurrency } from "@/enum/functions";
import DetailProductModal from "../../modals/detail-product-modal";
import EditProductModal from "../../modals/edit-product-modal";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { MyPagination } from "@/libs/pagination";
import MyLabel from "@/libs/label";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const SellingItemsTable = () => {
  const dispatch = useDispatch();
  const [sellingProducts, setSellingProducts] = useState<Product[]>();
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
        <DetailProductModal
          type={ProductStatus.SELLING}
          productId={productId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenEditModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa sản phẩm",
      content: <EditProductModal productId={productId} />,
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
        status: ProductStatus.SELLING,
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
      setSellingProducts(res?.data);
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

  const handleConfirmOffItem = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "TẮT SẢN PHẨM",
      message: "Bạn có chắc chắn tắt sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const token = storage.getLocalAccessToken();
          const variables = {
            status: ProductStatus?.OFF,
          };
          const res = await updateProductBySeller(id, variables, token);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Sản phẩm đã được tắt",
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
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sellingProducts?.map((product: Product, index: number) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{product?.productCode}</td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                            {product?.productName}
                          </div>
                          <div>
                            <span className="text-[10px]">Đã bán:</span>{" "}
                            <span className="text-[10px] font-bold text-primary-c900">
                              {product?.soldNumber}
                            </span>
                          </div>
                        </div>
                      </div>
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
                      {product?.inventoryNumber === 0 ? (
                        <MyLabel type="error">Hết hàng</MyLabel>
                      ) : (
                        <MyLabel type="success">Đang bán</MyLabel>
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
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenEditModal(product?.id)}
                          >
                            <EditIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <div className="hover:cursor-pointer">
                            <DeleteIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Tắt sản phẩm">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleConfirmOffItem(product?.id)}
                          >
                            <OffIcon />
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

export default SellingItemsTable;
