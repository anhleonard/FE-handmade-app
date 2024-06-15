"use client";
import React from "react";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import { AlertStatus, Role } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";
import InputPassword from "@/libs/input-password";
import { AlertState } from "@/enum/defined-type";
import { LoginFormValues } from "@/apis/types";
import { loginUser } from "@/apis/services/authentication";
import AuthLayout from "../auth-layout";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập email đúng định dạng.")
    .required("Vui lòng không để trống email."),
  password: yup.string().required("Vui lòng không để trống mật khẩu."),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: LoginFormValues = { email: "", password: "" };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        email: values.email,
        password: values.password,
      };
      const responseLogin = await loginUser(variables);

      if (responseLogin?.user?.role !== Role.SELLER) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Vui lòng đăng nhập account nhà bán!",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
        return;
      }

      const user = JSON.stringify(responseLogin?.user);
      storage.updateLocalUserId(responseLogin?.user?.id);
      storage.updateLocalAccessToken(responseLogin?.accessToken);
      storage.updateLocalUser(user);

      router.push("/");
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
      <h2 className="flex items-center justify-center text-xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-2xl md:leading-[115%]">
        Đăng nhập
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="space-y-6">
              <MyPrimaryTextField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isError={
                  getIn(formik.touched, "email") &&
                  Boolean(getIn(formik.errors, "email"))
                }
                helperText={
                  getIn(formik.touched, "email") &&
                  getIn(formik.errors, "email")
                }
              />

              <div className="flex flex-col items-start gap-2">
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
                {/* <Link
                  href={"/forgot-pass"}
                  className="text-xs font-medium text-grey-c700 underline"
                >
                  Quên mật khẩu?
                </Link> */}
              </div>

              <div className="flex flex-col items-end gap-2 pt-2">
                <Button
                  type="submit"
                  className="!w-full !py-3"
                  onClick={() => {
                    if (
                      getIn(formik.touched, "email") &&
                      Boolean(getIn(formik.errors, "email"))
                    ) {
                      console.log(formik.errors.email);
                    }
                  }}
                >
                  Đăng nhập
                </Button>
                <Link
                  href={"/auth/signup"}
                  className="text-xs font-medium text-grey-c700 underline"
                >
                  Bạn chưa có tài khoản?
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignIn;
