"use client";
import React, { useState } from "react";
import AuthLayout from "../../auth-layout";
import Button from "@/libs/button";
import MainInputImage from "@/libs/main-input-image";
import { useRouter } from "next/navigation";
import { AlertState, IDCardState } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { uploadSingleImage } from "@/apis/services/uploads";
import { addFrontCard } from "@/redux/slices/idCardSlice";

const UploadFrontCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();

  const handleAddCard = async () => {
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

    try {
      const file = await uploadSingleImage(formData);
      if (file) {
        let card: IDCardState = {
          frontCard: file,
        };
        dispatch(addFrontCard(card));
        router.push("/auth/upload-back-card");
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-8">
        <div className="text-2xl font-semibold text-grey-c900">
          Giấy tờ tùy thân
        </div>
        <img
          src="/images/upload-id-card.png"
          alt="upload-id-cards"
          className="h-25 w-25"
        />
        <div className="font-bold">Upload mặt trước CMND/ CCCD</div>
        <MainInputImage
          id="front-id-card"
          name="front-id-card"
          previewImage={previewImage}
          width="!w-[360px]"
          height="!h-[220px]"
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
        <Button
          className="!w-full !max-w-[360px] !py-3"
          onClick={() => handleAddCard()}
        >
          Tiếp tục
        </Button>
      </div>
    </AuthLayout>
  );
};

export default UploadFrontCard;
