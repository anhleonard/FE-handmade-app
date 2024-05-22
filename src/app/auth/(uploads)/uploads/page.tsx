"use client";
import React from "react";
import AuthLayout from "../../auth-layout";
import Button from "@/libs/button";
import { useRouter } from "next/navigation";

const UploadCardPage = () => {
  const router = useRouter();

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
        <div className="flex max-w-[360px] flex-col gap-3 rounded-3xl bg-blue-c50 p-5">
          <div className="font-bold">Yêu cầu</div>
          <div className="font-medium text-grey-c900">
            1. Giấy tờ tùy thân (CMND, CCCD)
          </div>
          <div className="font-medium text-grey-c900">
            2. Mã số thuế cá nhân
          </div>
        </div>

        <div className="max-w-[360px] text-center font-medium text-grey-c900">
          Vui lòng chắc chắn bạn có đầy đủ giấy tờ và đảm bảo chúng là chính
          xác!
        </div>
        <Button
          className="!w-full !max-w-[360px] !py-3"
          onClick={() => router.push("/auth/upload-front-card")}
        >
          Tải lên
        </Button>
      </div>
    </AuthLayout>
  );
};

export default UploadCardPage;
