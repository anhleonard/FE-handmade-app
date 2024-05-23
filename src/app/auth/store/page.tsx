"use client";
import React, { useState } from "react";
import AuthLayout from "../auth-layout";
import MyTextField from "@/libs/text-field";
import Link from "next/link";
import MainInputImage from "@/libs/main-input-image";
import MySingleCheckBox from "@/libs/single-checkbox";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";

const SetUpStorePage = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();
  const [checked, setChecked] = useState(false);

  return (
    <AuthLayout>
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
              <Link href={""} className="font-bold text-blue-c800 underline">
                Tìm hiểu thêm
              </Link>
            </div>
          }
        />
        <MyTextField
          id="mainBusiness"
          name="mainBusiness"
          placeholder="Ngành hàng chủ lực"
        />
        <MyTextArea
          id="description"
          name="description"
          placeholder="Nhập mô tả cho cửa hàng của bạn"
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
                URL.createObjectURL(event.target.files?.[0] ?? new Blob()),
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
          Sau khi gửi thông tin, ban quản trị sẽ nhận thông tin của bạn và kiểm
          tra. Kết quả kiểm duyệt sẽ có trong vòng 3 - 5 ngày, sau đó hãy kiểm
          tra email của bạn!
        </div>

        <Button className="!w-full !py-3" disabled={!checked}>
          Gửi thông tin đến ban quản trị
        </Button>
      </div>
    </AuthLayout>
  );
};

export default SetUpStorePage;
