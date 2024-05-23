"use client";
import React, { useEffect } from "react";
import AuthLayout from "../../../../auth-layout";
import Button from "@/libs/button";
import { redirect, useParams, useRouter } from "next/navigation";
import { AlertState } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { CheckTokenValues } from "@/apis/types";
import { checkingAlreadyToken } from "@/apis/services/tokens";

const UploadCardPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const token = params?.token?.toString();
  const sellerId = parseInt(params?.sellerId.toString());

  const checkAlreadyToken = async () => {
    try {
      dispatch(openLoading());
      const variables: CheckTokenValues = {
        token: token,
      };

      const res = await checkingAlreadyToken(variables);

      if (res === false) {
        router.push(`/auth/uploads/${token}`);
      } else {
        dispatch(closeLoading());
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
    //  finally {
    //   dispatch(closeLoading());
    // }
  };

  useEffect(() => {
    checkAlreadyToken();
  }, []);

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
