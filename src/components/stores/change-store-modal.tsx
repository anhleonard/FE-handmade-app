import { ChangeStoreValues } from "@/apis/types";
import { Store } from "@/enum/defined-type";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import MyTextField from "@/libs/text-field";
import Link from "next/link";
import MyTextArea from "@/libs/text-area";
import Button from "@/libs/button";
import MainInputImage from "@/libs/main-input-image";

type Props = {
  store?: Store;
};

const ChangeStoreModal = ({ store }: Props) => {
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();

  const initialValues: ChangeStoreValues = {
    name: "",
    mainBusiness: "",
    description: "",
    avatar: "",
    frontCard: "",
    backCard: "",
  };

  const onSubmit = async () => {};

  return (
    <div className="py-4">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="flex flex-col items-center gap-6">
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
                  rounded="!rounded-full"
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
              <Button className="!w-fit !py-3" type="submit">
                Gửi thông tin đến ban quản trị
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeStoreModal;
