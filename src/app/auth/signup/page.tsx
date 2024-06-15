"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import { AlertStatus } from "@/enum/constants";
import MyDatePicker from "@/libs/date-picker";
import Button from "@/libs/button";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import * as yup from "yup";
import { SignUpFormValues } from "@/apis/types";
import { Form, Formik, getIn } from "formik";
import moment from "moment";
import { openAlert } from "@/redux/slices/alertSlice";
import { AlertState } from "@/enum/defined-type";
import InputPassword from "@/libs/input-password";
import { signUpUser } from "@/apis/services/authentication";
import { useRouter } from "next/navigation";
import AuthLayout from "../auth-layout";

const validationSchema = yup.object({
  name: yup.string().required("Vui lòng không để trống họ tên."),
  email: yup
    .string()
    .email("Vui lòng nhập email đúng định dạng.")
    .required("Vui lòng không để trống email."),
  phoneNumber: yup
    .string()
    .required("Vui lòng không để trống số điện thoại.")
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng số điện thoại",
    ),
  password: yup
    .string()
    .required("Vui lòng không để trống mật khẩu.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/,
      "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một chữ thường, một chữ hoa, một số và một ký tự đặc biệt.",
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf(
      [yup.ref("password")],
      "Mật khẩu xác nhận phải trùng khớp với mật khẩu.",
    ),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: SignUpFormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "SELLER",
        phoneNumber: values.phoneNumber,
      };

      const response = await signUpUser(variables);
      router.push("/auth/signin");
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
    <AuthLayout>
      <div className="text-center text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-2xl">
        Đăng ký
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="space-y-6">
              <MyPrimaryTextField
                id="name"
                name="name"
                placeholder="Vui lòng nhập họ tên như trên giấy tờ để xác minh"
                onChange={formik.handleChange}
                value={formik.values.name}
                isError={
                  getIn(formik.touched, "name") &&
                  Boolean(getIn(formik.errors, "name"))
                }
                helperText={
                  getIn(formik.touched, "name") && getIn(formik.errors, "name")
                }
              />

              <MyPrimaryTextField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                isError={
                  getIn(formik.touched, "email") &&
                  Boolean(getIn(formik.errors, "email"))
                }
                helperText={
                  getIn(formik.touched, "email") &&
                  getIn(formik.errors, "email")
                }
              />

              <MyPrimaryTextField
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                isError={
                  getIn(formik.touched, "phoneNumber") &&
                  Boolean(getIn(formik.errors, "phoneNumber"))
                }
                helperText={
                  getIn(formik.touched, "phoneNumber") &&
                  getIn(formik.errors, "phoneNumber")
                }
                type="text"
                hasInputNumber
              />

              <InputPassword
                id="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.password}
                isError={
                  getIn(formik.touched, "password") &&
                  Boolean(getIn(formik.errors, "password"))
                }
                helperText={
                  getIn(formik.touched, "password") &&
                  getIn(formik.errors, "password")
                }
              />

              <InputPassword
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                isError={
                  getIn(formik.touched, "confirmPassword") &&
                  Boolean(getIn(formik.errors, "confirmPassword"))
                }
                helperText={
                  getIn(formik.touched, "confirmPassword") &&
                  getIn(formik.errors, "confirmPassword")
                }
              />

              <div className="flex flex-col items-end gap-2">
                <Button className="!w-full !py-3" type="submit">
                  Đăng ký
                </Button>
                <Link
                  href={"/auth/signin"}
                  className="text-xs font-medium text-grey-c700 underline"
                >
                  Bạn đã có tài khoản?
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
