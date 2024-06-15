import React, { useState } from "react";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import { COLORS } from "@/enum/colors";
import MyTextField from "@/libs/text-field";
import MyTextArea from "@/libs/text-area";
import Button from "@/libs/button";
import { CreateProgressValues } from "@/apis/types";
import { Form, Formik } from "formik";
import { AlertState, Auction } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { createProgress } from "@/apis/services/progresses";

type Props = {
  auction: Auction;
  handleRefetch: () => void;
};

const UpdateWorkForm = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: CreateProgressValues = {
    auctionId: auction.id,
    comment: "",
    percentage: 0,
  };

  const onSubmit = async (values: CreateProgressValues, { resetForm }: any) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = { ...values };
      const res = await createProgress(variables, token);
      if (res) {
        resetForm();
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Bạn đã cập nhật thành công tiến độ!",
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
              <DonutLargeRoundedIcon
                sx={{ fontSize: 22, color: COLORS.grey.c800 }}
              />
              <div className="font-bold text-grey-c900">
                Cập nhật tiến độ công việc
              </div>
            </div>
            <MyTextField
              id="percentage"
              name="percentage"
              type="number"
              title="Phần trăm tiến độ"
              placeholder="Nhập phần trăm tiến độ mà bạn đã làm được"
              isRequired
              endIcon={
                <span className="pl-2 text-xs font-bold text-primary-c900">
                  {formik.values.percentage
                    ? formik.values.percentage.toString() + "%"
                    : "0%"}
                </span>
              }
              value={formik.values.percentage}
              onChange={formik.handleChange}
            />
            <MyTextArea
              id="comment"
              name="comment"
              title="Nội dung"
              isRequired
              placeholder="Nhập nội dung"
              value={formik.values.comment}
              onChange={formik.handleChange}
            />
            <div className="flex flex-row justify-end">
              <Button className="!w-fit" color="primary" type="submit">
                <span className="text-sm font-medium">Thêm</span>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateWorkForm;
