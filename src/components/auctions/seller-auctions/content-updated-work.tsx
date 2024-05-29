import { updateProgress } from "@/apis/services/progresses";
import storage from "@/apis/storage";
import { UpdateProgressValues } from "@/apis/types";
import { COLORS } from "@/enum/colors";
import { AlertStatus, AuctionStatus, Role } from "@/enum/constants";
import { AlertState, Progress } from "@/enum/defined-type";
import { formatDate } from "@/enum/functions";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type ContentUpdatedWorkProps = {
  type?: "client" | "seller";
  status: AuctionStatus;
  progress: Progress;
  handleRefetch: () => void;
};

const ContentUpdatedWork = ({
  type,
  status,
  progress,
  handleRefetch,
}: ContentUpdatedWorkProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(progress.comment);
  const dispatch = useDispatch();
  const currentUserId = storage.getLocalUserId();

  const handleEditComment = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: UpdateProgressValues = {
        comment: content,
      };
      const res = await updateProgress(progress.id, variables, token);
      if (res) {
        setIsEdit(false);
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
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Avatar
            sx={{
              bgcolor:
                progress?.user?.role === Role.SELLER
                  ? COLORS.primary.c800
                  : COLORS.blue.c800,
              width: 42,
              height: 42,
            }}
          >
            {progress?.user?.role === Role.SELLER ? "T" : "K"}
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <div className="font-bold text-grey-c900">
              {progress?.user?.role === Role.SELLER ? "Tôi" : "Khách"}
            </div>
            <div className="flex flex-row items-center gap-2 text-grey-c900">
              <div className="text-xs">{formatDate(progress?.createdAt)}</div>
              {progress?.percentage && (
                <div className="font-bold text-primary-c900">
                  {" "}
                  {progress?.percentage}%
                </div>
              )}
            </div>
          </div>
        </div>
        {status === AuctionStatus.PROGRESS &&
          parseInt(currentUserId) === progress?.user?.id &&
          (isEdit ? (
            <div className="flex flex-row items-center gap-2">
              <Button
                className="!w-fit !px-3 !py-1.5"
                color="grey"
                onClick={() => {
                  setContent(progress.comment);
                  setIsEdit(false);
                }}
              >
                <span className="text-xs font-medium">Hủy bỏ</span>
              </Button>
              <Button
                className="!w-fit !px-3 !py-1.5"
                color="primary"
                onClick={() => handleEditComment()}
              >
                <span className="text-xs font-medium">Cập nhật</span>
              </Button>
            </div>
          ) : (
            <Button
              className="!w-fit !px-3 !py-1.5"
              color="info"
              onClick={() => setIsEdit(true)}
            >
              <span className="text-xs font-medium">Chỉnh sửa</span>
            </Button>
          ))}
      </div>

      {isEdit ? (
        <MyTextArea
          id={Math.random().toString()}
          placeholder="Nhập nội dung"
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="text-justify text-grey-c900">{content}</div>
      )}
    </div>
  );
};

export default ContentUpdatedWork;
