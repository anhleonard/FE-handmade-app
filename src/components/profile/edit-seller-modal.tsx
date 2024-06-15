"use client";
import { updateSeller } from "@/apis/services/users";
import storage from "@/apis/storage";
import { UpdateSellerValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, User } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  seller: User;
  handleRefetch: () => void;
};

const EditSellerModal = ({ seller, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: UpdateSellerValues = {
    name: seller?.name ?? "",
    email: seller?.email ?? "",
    phoneNumber: seller?.phoneNumber ?? "",
  };

  const onSubmit = async (values: UpdateSellerValues) => {
    try {
      dispatch(openLoading());
      const variables: UpdateSellerValues = {
        phoneNumber: values?.phoneNumber,
      };

      const userId = storage.getLocalUserId();
      const token = storage.getLocalAccessToken();
      const res = await updateSeller(+userId, variables, token);
      if (res) {
        dispatch(closeModal());
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
          <div className="flex flex-col items-center justify-center gap-4 py-2">
            <MyTextField
              id="name"
              name="name"
              title="Tên chủ shop"
              isRequired={false}
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled
            />

            <MyTextField
              id="email"
              name="email"
              title="Email"
              isRequired={false}
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled
            />

            <MyTextField
              id="phoneNumber"
              name="phoneNumber"
              title="Số điện thoại"
              isRequired={false}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />

            <Button className="!my-4 !w-fit !min-w-[200px]" type="submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditSellerModal;
