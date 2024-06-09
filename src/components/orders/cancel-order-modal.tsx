import { cancelOrder } from "@/apis/services/orders";
import { createRefundPayment } from "@/apis/services/payment";
import storage from "@/apis/storage";
import { CancelOrderValues, CreateRefundPaymentValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Order } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyPrimaryTextField from "@/libs/primary-text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const reasons = [
  "Số lượng tồn kho đã hết.",
  "Sản phẩm đang lỗi, không thể giao.",
  "Địa chỉ giao hàng không chính xác hoặc không thể giao đến.",
  "Yêu cầu từ khách hàng.",
  "Nhà cung cấp không thể cung cấp sản phẩm.",
  "Sản phẩm không đáp ứng tiêu chuẩn chất lượng.",
];

type Props = {
  order: Order;
  handleRefetch: () => void;
};

const CancelOrderModal = ({ order, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleCancelOrder = async () => {
    try {
      dispatch(openLoading());

      //create refund for order
      if (order?.isPaid) {
        const variables: CreateRefundPaymentValues = {
          zp_trans_id: order?.zp_trans_id,
          amount: order.totalPayment,
        };
        const res = await createRefundPayment(variables);
        if (res?.return_code === 2) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI",
            message: "Hoàn tiền không thành công!",
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        }
      }

      const variables: CancelOrderValues = {
        isCanceled: true,
        canceledReason: value,
      };
      const token = storage.getLocalAccessToken();
      const res = await cancelOrder(order?.id, token, variables);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "ĐÃ HỦY",
          message: "Đã hủy đơn hàng thành công",
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
  };

  return (
    <div className="flex flex-col gap-2 overflow-auto px-4 py-2 dark:border-slate-700">
      <FormControl className="w-full pt-2">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          className="space-y-3"
        >
          {reasons?.map((value, index) => {
            return (
              <FormControlLabel
                key={index}
                value={value}
                control={<Radio />}
                label={value}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <MyPrimaryTextField
        id="reason"
        title="Khác"
        placeholder="Nhập nếu lý do không có ở trên"
        onChange={(event) => handleChange(event)}
      />
      <Button
        className="!mt-4 !scale-100 !py-3"
        color="black"
        onClick={() => handleCancelOrder()}
      >
        Hủy đơn
      </Button>
    </div>
  );
};

export default CancelOrderModal;
