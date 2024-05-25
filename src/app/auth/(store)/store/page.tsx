"use client";
import React, { useState } from "react";
import AuthLayout from "../../auth-layout";
import MyTextField from "@/libs/text-field";
import Link from "next/link";
import MainInputImage from "@/libs/main-input-image";
import MySingleCheckBox from "@/libs/single-checkbox";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CreateStoreValues } from "@/apis/types";
import { Form, Formik } from "formik";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { uploadSingleImage } from "@/apis/services/uploads";
import { createStore } from "@/apis/services/stores";
import { useRouter } from "next/navigation";

const SetUpStorePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();
  const [checked, setChecked] = useState(false);

  const cardData = useSelector((state: RootState) => state.idCards);

  const initialValues: CreateStoreValues = {
    sellerId: cardData?.sellerId as number,
    name: "",
    mainBusiness: "",
    description: "",
    avatar: "",
    frontCard: cardData?.frontCard as string,
    backCard: cardData?.backCard as string,
  };

  const onSubmit = async (values: CreateStoreValues) => {
    //create store avatar
    const formData = new FormData();

    if (fileImage) {
      formData.append("image", fileImage);
    } else {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể upload ảnh!",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
      return;
    }

    //create store with all values
    try {
      dispatch(openLoading());
      const file = await uploadSingleImage(formData);
      if (file) {
        const variables: CreateStoreValues = {
          ...values,
          name: values.name,
          mainBusiness: values.mainBusiness,
          description: values.description,
          avatar: file,
        };

        const res = await createStore(variables);
        if (res) {
          router.push("/auth/created-store");
        }
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
    <AuthLayout>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="flex flex-col items-center gap-6">
              <div className="text-2xl font-semibold text-grey-c900">
                Thiết lập gian hàng
              </div>
              <MyTextField
                id="name"
                name="name"
                placeholder="Nhập tên cửa hàng của bạn"
                helperText={
                  <div className="text-grey-c800">
                    Vui lòng nhập tên gian hàng theo đúng quy định{" "}
                    <Link
                      href={""}
                      className="font-bold text-blue-c800 underline"
                    >
                      Tìm hiểu thêm
                    </Link>
                  </div>
                }
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <MyTextField
                id="mainBusiness"
                name="mainBusiness"
                placeholder="Ngành hàng chủ lực"
                value={formik.values.mainBusiness}
                onChange={formik.handleChange}
              />
              <MyTextArea
                id="description"
                name="description"
                placeholder="Nhập mô tả cho cửa hàng của bạn"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <div className="flex items-center justify-center">
                <MainInputImage
                  id="store-image"
                  name="store-image"
                  previewImage={previewImage}
                  width="!w-[160px]"
                  height="!h-[160px]"
                  onChange={(event) => {
                    setFileImage(event.target.files?.[0]);
                    setPreviewImage(
                      URL.createObjectURL(
                        event.target.files?.[0] ?? new Blob(),
                      ),
                    );
                  }}
                  onDeleteImage={() => {
                    setFileImage(null);
                    setPreviewImage("");
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <MySingleCheckBox
                  size={21}
                  isChecked={checked}
                  onChanged={() => setChecked(!checked)}
                />
                <div className="font-medium text-grey-c900">
                  Xác nhận mọi thông tin bạn đưa ra là chính xác!
                </div>
              </div>

              <div className="text-justify font-medium text-grey-c900">
                Sau khi gửi thông tin, ban quản trị sẽ nhận thông tin của bạn và
                kiểm tra. Kết quả kiểm duyệt sẽ có trong vòng 3 - 5 ngày, sau đó
                hãy kiểm tra email của bạn!
              </div>

              <Button
                className="!w-full !py-3"
                disabled={!checked}
                type="submit"
              >
                Gửi thông tin đến ban quản trị
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SetUpStorePage;
