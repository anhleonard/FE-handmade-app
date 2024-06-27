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

      const token = storage.getLocalAccessToken();
      const selectedBidder = auction?.candidates?.filter(
        (bidder) => bidder.isSelected === true,
      )[0];
      const userPaids = auction?.paids || [];
      const auctionId = auction?.id;

      const variables = {
        status: AuctionStatus.CANCELED,
        additionalComment: values?.additionalComment,
      };

      let deposit = 0;
      let depositValues: CreateRefundPaymentValues | null = null;
      let totalValues: CreateRefundPaymentValues | null = null;

      userPaids.forEach((paid) => {
        if (paid.type === "deposit") {
          depositValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: auction.deposit,
          };
          deposit = auction.deposit;
        }

        if (paid.type === "total") {
          totalValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: selectedBidder.bidderMoney - deposit,
          };
        }
      });

      const handlePaymentRefund = async (
        paymentValues: CreateRefundPaymentValues,
        type: string,
      ) => {
        const res = await createRefundPayment(paymentValues);
        if (res?.return_code === 2) {
          const alert: AlertState = {
            isOpen: true,
            title: `LỖI HOÀN TIỀN ${type === "deposit" ? "CỌC" : ""}`,
            message: res?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return false;
        }
        const params: PaidAuctionValues = {
          auctionId,
          type,
        };
        await updatePaidAuction(params, token);
        return true;
      };

      const refundDeposit = depositValues
        ? handlePaymentRefund(depositValues, "deposit")
        : Promise.resolve(true);
      const refundTotal = totalValues
        ? handlePaymentRefund(totalValues, "total")
        : Promise.resolve(true);

      const [isDepositRefunded, isTotalRefunded] = await Promise.all([
        refundDeposit,
        refundTotal,
      ]);

      console.log({ isDepositRefunded, isTotalRefunded });

      if (isDepositRefunded && isTotalRefunded) {
        const updatedAuction = await updateAuction(auctionId, variables, token);
        if (updatedAuction) {
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
