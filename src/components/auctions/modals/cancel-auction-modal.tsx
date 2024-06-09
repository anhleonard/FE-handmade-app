import { updateAuction } from "@/apis/services/auctions";
import {
  createRefundPayment,
  updatePaidAuction,
} from "@/apis/services/payment";
import storage from "@/apis/storage";
import {
  CancelAuctionValues,
  CreateRefundPaymentValues,
  PaidAuctionValues,
} from "@/apis/types";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction, PaidAuction } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  auction: Auction;
  handleRefetch: () => void;
};

const CancelAuctionModal = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: CancelAuctionValues = {
    status: AuctionStatus.CANCELED,
    additionalComment: "",
  };

  const onSubmit = async (values: CancelAuctionValues) => {
    try {
      dispatch(openLoading());

      //update auction
      const variables = {
        status: AuctionStatus.CANCELED,
        additionalComment: values.additionalComment,
      };
      const token = storage.getLocalAccessToken();

      //refund amount of money
      const userPaids: PaidAuction[] = auction?.paids;

      let deposit = 0; //khởi tạo deposit
      let depositValues: CreateRefundPaymentValues | null = null;
      let totalValues: CreateRefundPaymentValues | null = null;

      const selectedBidder = auction?.candidates?.filter(
        (bidder) => bidder.isSelected === true,
      )[0];

      for (let paid of userPaids) {
        if (paid.type === "deposit") {
          depositValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: auction.deposit,
          };

          deposit = auction?.deposit;
        }

        if (paid.type === "total") {
          totalValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: selectedBidder?.bidderMoney - deposit,
          };
        }
      }

      let resDeposit: any;
      let resTotal: any;

      if (depositValues) {
        resDeposit = await createRefundPayment(depositValues);
        if (resDeposit?.return_code === 2) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI HOÀN TIỀN CỌC",
            message: resDeposit?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        }
        const params: PaidAuctionValues = {
          auctionId: auction?.id,
          type: "deposit",
        };
        await updatePaidAuction(params, token);
      }

      if (totalValues) {
        resTotal = await createRefundPayment(totalValues);
        if (resTotal?.return_code === 2) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI HOÀN TIỀN",
            message: resDeposit?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        }
        const params: PaidAuctionValues = {
          auctionId: auction?.id,
          type: "total",
        };
        await updatePaidAuction(params, token);
      }

      const updatedAuction = await updateAuction(auction?.id, variables, token);

      if (updatedAuction && resDeposit && resTotal) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "HỦY DỰ ÁN & HOÀN TIỀN",
          message: "Đã hủy dự án và hoàn tiền lại cho khách hàng thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-4 px-2 py-4">
            <div className="text-sm font-medium text-support-c600">
              Chú ý: Khi hủy tiền mà khách đã trả cho dự án sẽ hoàn lại toàn bộ.
            </div>
            <MyTextArea
              id="additionalComment"
              name="additionalComment"
              title="Lý do"
              placeholder="Nhập lý do hủy dự án"
              value={formik.values.additionalComment}
              onChange={formik.handleChange}
              isRequired
            />
            <div className="flex flex-row items-center justify-center">
              <Button color="black" className="!w-fit !scale-100" type="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CancelAuctionModal;
