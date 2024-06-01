import { singleOrder } from "@/apis/services/orders";
import storage from "@/apis/storage";
import ClientAddress from "@/components/clients/client-address";
import OrderPackage from "@/components/orders/order-package";
import { AlertStatus, EnumOrderStatus, Role } from "@/enum/constants";
import { AlertState, Order, OrderProduct } from "@/enum/defined-type";
import {
  formatCommonTime,
  formatCurrency,
  renderWhoCanceled,
} from "@/enum/functions";
import Button from "@/libs/button";
import MyLabel from "@/libs/label";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type DetailOrderModalProps = {
  type: EnumOrderStatus;
  orderId: number;
};

const caculateProfit = (items: OrderProduct[]) => {
  let total = 0;
  for (let item of items) {
    total += item?.product?.profitMoney;
  }
  return total;
};

const DetailOrderModal = ({ type, orderId }: DetailOrderModalProps) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>();

  const getSingleOrder = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await singleOrder(orderId, token);
      if (res) {
        setOrder(res);
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
    getSingleOrder();
  }, []);

  const renderStatusLabel = (status: EnumOrderStatus) => {
    switch (status) {
      case EnumOrderStatus.WAITING_PAYMENT:
        return <MyLabel type="warning">Chờ thanh toán</MyLabel>;

      case EnumOrderStatus.PROCESSING:
        return <MyLabel type="progress">Đang xử lý</MyLabel>;

      case EnumOrderStatus.DELIVERED:
        return <MyLabel type="delivery">Đang vận chuyển</MyLabel>;

      case EnumOrderStatus.SHIPPED:
        return <MyLabel type="success">Đã giao</MyLabel>;

      case EnumOrderStatus.CENCELLED:
        return <MyLabel type="error">Đã hủy</MyLabel>;
    }
  };

  const renderInformation = (status: EnumOrderStatus) => {
    switch (status) {
      case EnumOrderStatus.SHIPPED:
        return (
          <>
            <div>
              Ngày đặt hàng:{" "}
              <span className="font-semibold">
                {order?.orderAt && formatCommonTime(order?.orderAt)}
              </span>
            </div>
            <div>
              Ngày giao hàng:{" "}
              <span className="font-semibold">
                {order?.processingAt && formatCommonTime(order?.shippedAt)}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              Trạng thái:{" "}
              {order?.status &&
                renderStatusLabel(order?.status as EnumOrderStatus)}
            </div>
          </>
        );
      case EnumOrderStatus.PROCESSING:
        return (
          <>
            <div>
              Ngày đặt hàng:{" "}
              <span className="font-semibold">
                {order?.orderAt && formatCommonTime(order?.orderAt)}
              </span>
            </div>
            <div>
              Duyệt lúc:{" "}
              <span className="font-semibold">
                {order?.processingAt && formatCommonTime(order?.processingAt)}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              Trạng thái:{" "}
              {order?.status &&
                renderStatusLabel(order?.status as EnumOrderStatus)}
            </div>
          </>
        );
      case EnumOrderStatus.WAITING_PAYMENT:
        return (
          <>
            <div>
              Ngày đặt hàng:{" "}
              <span className="font-semibold">
                {order?.orderAt && formatCommonTime(order?.orderAt)}
              </span>
            </div>
            <div>
              Hạn xác nhận:{" "}
              <span className="font-semibold">
                {order?.orderAt && formatCommonTime(order?.orderAt, 7)}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              Trạng thái:{" "}
              {order?.status &&
                renderStatusLabel(order?.status as EnumOrderStatus)}
            </div>
          </>
        );
      case EnumOrderStatus.CENCELLED:
        return (
          <>
            <div>
              Hủy vào lúc:{" "}
              <span className="font-semibold">
                {order?.updatedAt && formatCommonTime(order?.updatedAt)}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              Trạng thái: <MyLabel type="error">Đã hủy</MyLabel>
            </div>
          </>
        );
      case EnumOrderStatus.DELIVERED:
        return (
          <>
            <div>
              Ngày đặt hàng:{" "}
              <span className="font-semibold">
                {order?.orderAt && formatCommonTime(order?.orderAt)}
              </span>
            </div>
            <div>
              Xác nhận vận chuyển lúc:{" "}
              <span className="font-semibold">
                {order?.deliveredAt && formatCommonTime(order?.deliveredAt)}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              Trạng thái:{" "}
              {order?.status &&
                renderStatusLabel(order?.status as EnumOrderStatus)}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-8 py-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col gap-3 text-sm">
          <div>
            Mã đơn hàng: <span className="font-semibold">{order?.code}</span>
          </div>
          {renderInformation(order?.status as EnumOrderStatus)}
        </div>
        <div className="col-span-1 flex flex-col gap-3 text-sm">
          {type === EnumOrderStatus.CENCELLED ? (
            <>
              <div>
                Hủy bởi:{" "}
                <span className="font-semibold text-support-c500">
                  {order?.updatedBy?.role &&
                    renderWhoCanceled(order?.updatedBy?.role)}
                </span>
              </div>
              <>
                {!order?.isPaid && (
                  <div>
                    Tổng tiền:{" "}
                    <span className="font-semibold text-primary-c900">
                      {order?.totalPayment &&
                        formatCurrency(order?.totalPayment)}
                    </span>
                  </div>
                )}
              </>
              <>
                {order?.isPaid && (
                  <>
                    <div>
                      Tiền hoàn lại:{" "}
                      <span className="font-semibold text-primary-c900">
                        {order?.totalPayment &&
                          formatCurrency(order?.totalPayment)}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      Hoàn tiền:{" "}
                      <span className="font-semibold">Đã hoàn trả</span>
                    </div>
                  </>
                )}
              </>
            </>
          ) : (
            <>
              <div>
                Khách trả:{" "}
                <span className="font-semibold text-primary-c900">
                  {order?.totalPayment && formatCurrency(order?.totalPayment)}
                </span>
              </div>
              <div>
                Handmade dự thu:{" "}
                <span className="font-semibold text-support-c500">
                  {order?.totalPayment &&
                    formatCurrency(order?.totalPayment * 0.2)}
                </span>
              </div>
              <div>
                Thu về:{" "}
                <span className="font-semibold text-success-c900">
                  {order?.totalPayment &&
                    formatCurrency(order?.totalPayment * 0.8)}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                Thanh toán:{" "}
                <span className="font-semibold">
                  {order?.isPaid ? "Đã thanh toán" : "Thanh toán khi nhận hàng"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {order?.shippingAddress && (
        <ClientAddress shipping={order?.shippingAddress} />
      )}
      {order?.orderProducts && (
        <OrderPackage orderProducts={order?.orderProducts} />
      )}
      {type === EnumOrderStatus.WAITING_PAYMENT && (
        <Button className="mx-auto max-w-[200px]">Xác nhận đơn hàng</Button>
      )}
    </div>
  );
};

export default DetailOrderModal;
