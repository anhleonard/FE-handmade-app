"use client";
import React, { useState } from "react";
import AuthLayout from "../../auth-layout";
import Button from "@/libs/button";
import MainInputImage from "@/libs/main-input-image";
import { useRouter } from "next/navigation";

const UploadFrontCard = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();

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
          onClick={() => router.push("/auth/upload-back-card")}
        >
          Tiếp tục
        </Button>
      </div>
    </AuthLayout>
  );
};

export default UploadFrontCard;
