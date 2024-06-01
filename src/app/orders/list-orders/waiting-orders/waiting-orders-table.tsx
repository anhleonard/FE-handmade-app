import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { COLORS } from "@/enum/colors";
import DetailOrderModal from "../../modals/detail-order-modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import { AlertState, Order } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { filterSellerOrders, updateOrder } from "@/apis/services/orders";
import {
  AlertStatus,
  EnumOrderStatus,
  Page,
  rowsPerPage,
} from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { formatCommonTime, formatCurrency } from "@/enum/functions";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import CancelOrderModal from "@/components/orders/cancel-order-modal";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { MyPagination } from "@/libs/pagination";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
];

const WaitingOrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [orderAt, setOrderAt] = useState<string>("");

  const getAllOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await filterSellerOrders(token, {
        limit: rowsPage,
        page: page,
        status: EnumOrderStatus.WAITING_PAYMENT,
        ...(selectedOption === labelOptions[0] &&
          searchText !== "" && {
            code: searchText,
          }),
        ...(selectedOption === labelOptions[1] &&
          searchText !== "" && {
            clientName: searchText,
          }),
        ...(orderAt !== "" && {
          orderAt: orderAt,
        }),
      });
      if (res) {
        setCount(res?.total ?? 0);
        setOrders(res?.data);
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
    getAllOrders();
  }, [refetchQueries, page, rowsPage, orderAt]);

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

  const handleOpenDetailModal = (orderId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết đơn hàng",
      content: (
        <DetailOrderModal
          type={EnumOrderStatus.WAITING_PAYMENT}
          orderId={orderId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmOrder = (orderId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN ĐƠN HÀNG",
      message: "Bạn có chắc chắn xác nhận đơn hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const token = storage.getLocalAccessToken();
          const variables = {
            status: EnumOrderStatus.PROCESSING,
          };
          const res = await updateOrder(orderId, token, variables);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "DUYỆT THÀNH CÔNG",
              message: "Đã duyệt đơn hàng thành công!",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
            handleRefetch();
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

  const handleOpenCancelModal = (orderId: number) => {
    const modal = {
      isOpen: true,
      title: "Lí do hủy đơn hàng",
      content: (
        <CancelOrderModal orderId={orderId} handleRefetch={handleRefetch} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect
            options={labelOptions}
            selected={labelOptions[0].value}
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
        <div className="flex flex-row items-center justify-center gap-4">
          <div>Ngày đặt hàng</div>

          <div className="flex flex-row items-center gap-1">
            <MyDatePicker
              id="order-at"
              name="order-at"
              className="flex-1"
              onChange={(value) => setOrderAt(value[0].toString())}
            />

            {orderAt !== "" ? (
              <IconButton onClick={() => setOrderAt("")}>
                <ClearRoundedIcon style={{ width: 16, height: 16 }} />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã đơn hàng</th>
                <th className="px-1 py-4">Tên khách hàng</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Số lượng</th>
                <th className="px-1 py-4">Khách trả</th>
                <th className="px-1 py-4">Ngày đặt hàng</th>
                <th className="px-1 py-4">Hạn xác nhận</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                // if (!order?.orderProducts?.length) return null;
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{order?.code}</td>
                    <td className="px-1 py-4">{order?.client?.name}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="warning">Chờ xác nhận</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      {order?.orderProducts?.length}
                    </td>
                    <td className="px-1 py-4">
                      {formatCurrency(order?.totalPayment)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.orderAt)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.orderAt, 7)}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết đơn hàng">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(order?.id)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Xác nhận">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleConfirmOrder(order?.id)}
                          >
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 20, color: COLORS.blue.c900 }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenCancelModal(order?.id)}
                          >
                            <DoNotDisturbOnOutlinedIcon
                              sx={{ fontSize: 20, color: COLORS.support.c500 }}
                            />
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

export default WaitingOrdersTable;
