"use client";
import {
  AlertStatus,
  Page,
  ProductStatus,
  rowsPerPage,
} from "@/enum/constants";
import { DeleteIcon, EditIcon, SearchIcon } from "@/enum/icons";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import { COLORS } from "@/enum/colors";
import DetailProductModal from "../../modals/detail-product-modal";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { useEffect, useState } from "react";
import { AlertState, Product } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { deleteProduct, filterSellerProducts } from "@/apis/services/product";
import { openAlert } from "@/redux/slices/alertSlice";
import { headerUrl } from "@/apis/services/authentication";
import { formatDate } from "@/enum/functions";
import { MyPagination } from "@/libs/pagination";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import MyLabel from "@/libs/label";
import EditTotalProductModal from "../../modals/edit-total-product-modal";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const ViolateItemsTable = () => {
  const dispatch = useDispatch();
  const [violateProducts, setViolateProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [searchText, setSearchText] = useState<string>("");

  const handleOpenDetailModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm & lỗi",
      content: (
        <DetailProductModal
          type={ProductStatus.VIOLATE}
          productId={productId}
        />
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
        status: ProductStatus.VIOLATE,
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
      setViolateProducts(res?.data);
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
          updateTextButton="Gửi duyệt lại"
        />
      ),
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmDeleteItem = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÓA SẢN PHẨM",
      message: "Bạn có chắc chắn xóa cho sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => handleDeleteProduct(id),
    };

    dispatch(openConfirm(confirm));
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await deleteProduct(id, token);
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
              setPage(1);
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
                <th className="px-1 py-4">Ngày phát hiện vi phạm</th>
                <th className="px-1 py-4">Lý do</th>
                <th className="px-1 py-4">Gợi ý chỉnh sửa</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {violateProducts?.map((product: Product, index: number) => {
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
                          <div className=" overflow-ellipsis break-words ">
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
                    <td className="px-1 py-4 align-top">
                      <MyLabel type="error">Vi phạm</MyLabel>
                    </td>
                    <td className="px-1 py-4 align-top">
                      {formatDate(product?.updatedAt)}
                    </td>
                    <td className="px-1 py-4 align-top">
                      {product?.rejectReason}
                    </td>
                    <td className="max-w-[200px] px-1 py-4 align-top">
                      {product?.editHint}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết lỗi">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(product?.id)}
                          >
                            <ErrorOutlineIcon
                              sx={{ color: COLORS.primary.c700, fontSize: 22 }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
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

export default ViolateItemsTable;
