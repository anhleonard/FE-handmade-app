"use client";
import RecommendIcon from "@mui/icons-material/Recommend";
import { FontFamily, FontSize, TextColor } from "@/enum/setting";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import Typography from "@/libs/typography";
import { closeConfirm } from "@/redux/slices/confirmSlice";

export default function ConfirmModal() {
  const confirmData = useSelector((state: RootState) => state.confirm);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCloseAlert = () => {
    dispatch(closeConfirm());
  };

  const handleConfirm = () => {
    if (confirmData.onConfirm) {
      confirmData.onConfirm();
    }
  };

  return (
    <div
      className="relative z-[50000]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={!confirmData.isOpen}
    >
      <div className="pointer-events-none fixed inset-0 z-[50000] w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-start sm:p-0">
          <div className="pointer-events-auto relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <RecommendIcon fontSize="large" color="error"></RecommendIcon>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Typography
                    fontSize={FontSize.BASE}
                    fontFamily={FontFamily.BOLD}
                    textColor={TextColor.SUPPORT_900}
                  >
                    {confirmData.title}
                  </Typography>
                  <div className="mt-2">
                    <Typography
                      fontSize={FontSize.SM}
                      fontFamily={FontFamily.SEMI_BOLD}
                      textColor={TextColor.SUPPORT_800}
                    >
                      {confirmData.message}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-auto gap-2 bg-grey-c50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleCloseAlert}
                className="hover:bg-support-300 mt-3 inline-flex items-center justify-center rounded-3xl bg-white px-4 py-2 text-sm font-semibold text-grey-c700 shadow-sm sm:mt-0 sm:w-auto"
              >
                Hủy
                <CloseIcon fontSize="small"></CloseIcon>
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="mt-3 inline-flex items-center justify-center rounded-3xl bg-support-c900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-support-c800 sm:mt-0 sm:w-auto"
              >
                Xác nhận
                <CheckIcon fontSize="small"></CheckIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[10000] bg-grey-c900 opacity-30 blur-sm transition-opacity"></div>
    </div>
  );
}
