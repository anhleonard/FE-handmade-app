import { createAddition } from "@/apis/services/additions";
import storage from "@/apis/storage";
import { ExtendDaysValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  auction: Auction;
  handleRefetch: () => void;
};

const ExtendDaysModal = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: ExtendDaysValues = {
    auctionId: auction?.id,
    comment: "",
    days: "",
  };

  const onSubmit = async (values: ExtendDaysValues) => {
    try {
      const variables = {
        ...values,
        days: values.days && parseInt(values.days),
      };

      const token = storage.getLocalAccessToken();
      const res = await createAddition(variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "YÊU CẦU GIA HẠN",
          message: "Gửi yêu cầu gia hạn thành công",
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-4 px-2 py-4">
            <MyTextField
              id="days"
              name="days"
              title="Số ngày"
              placeholder="Nhập số ngày cần gia hạn thêm"
              value={formik.values.days}
              onChange={formik.handleChange}
              isRequired
              type="number"
            />
            <MyTextArea
              id="comment"
              name="comment"
              title="Lý do chậm trễ"
              placeholder="Nhập lý do chậm trễ dự án"
              value={formik.values.comment}
              onChange={formik.handleChange}
              isRequired
            />
            <div className="flex flex-row items-center justify-center">
              <Button color="black" className="!w-fit !scale-100" type="submit">
                Gửi yêu cầu
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExtendDaysModal;
