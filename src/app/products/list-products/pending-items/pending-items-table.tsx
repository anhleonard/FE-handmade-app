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
import Image from "next/image";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import DetailProductModal from "../../modals/detail-product-modal";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import {
  deleteProduct,
  filterSellerProducts,
  getPendingProducts,
} from "@/apis/services/product";
import storage from "@/apis/storage";
import { AlertState, Category, Product } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/enum/functions";
import { headerUrl } from "@/apis/services/authentication";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import EditTotalProductModal from "../../modals/edit-total-product-modal";
import { MyPagination } from "@/libs/pagination";
import MyLabel from "@/libs/label";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const PendingItemsTable = () => {
  const dispatch = useDispatch();
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
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
          type={ProductStatus.PENDING}
          productId={productId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmDeleteItem = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "HỦY CHỜ DUYỆT SẢN PHẨM",
      message: "Bạn có chắc chắn hủy chờ duyệt cho sản phẩm này không?",
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
              message: "Đã xóa sản phẩm khỏi danh sách chờ duyệt thành công",
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

  // get all seller products by seller token
  const getAllSellerProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await filterSellerProducts(token, {
        limit: rowsPage,
        page: page,
        status: ProductStatus.PENDING,
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
      setPendingProducts(res?.data);
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

  const handleOpenEditModal = async (product: Product) => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa sản phẩm",
      content: (
        <EditTotalProductModal
          product={product}
          handleRefetch={handleRefetch}
        />
      ),
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
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
                <th className="px-1 py-4">Danh mục</th>
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4">Ngày tạo</th>
                <th className="px-1 py-4">Thời hạn duyệt</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts?.map((product: Product, index: number) => {
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
                          <div className="w-[160px] overflow-ellipsis break-words md:w-[200px] ">
                            {product.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      <MyLabel type="warning">Chờ duyệt</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-col items-start justify-start gap-1">
                        {product.category?.map(
                          (cate: Category, index: number) => {
                            return <div key={index}>{cate?.title}</div>;
                          },
                        )}
                      </div>
                    </td>
                    <td className="px-1 py-4">{product.inventoryNumber}</td>
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
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-1 py-4">
                      {product?.createdAt ? (
                        formatDate(
                          new Date(
                            new Date(product.createdAt).getTime() +
                              7 * 24 * 60 * 60 * 1000,
                          ),
                        )
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
                        <Tooltip title="Chỉnh sửa sản phẩm">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenEditModal(product)}
                          >
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

export default PendingItemsTable;
