import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyTextField from "@/libs/text-field";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MyTextArea from "@/libs/text-area";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { createBidder } from "@/apis/services/auctions";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { AlertState, Auction } from "@/enum/defined-type";
import storage from "@/apis/storage";
import { CreateBidderValues } from "@/apis/types";
import { Form, Formik } from "formik";

const benefits = [
  "Đặt giá và khung giờ theo ý của bạn",
  "Được trả tiền cho công việc của bạn",
  "Được trao đổi và làm nhiều dự án",
  "Miễn phí đăng ký và đặt giá",
];

type Props = {
  auction: Auction;
  handleRefetch: () => void;
};

const SellerAuctionInformation = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const sellerId = storage.getLocalUserId();

  const hasSet = auction?.candidates?.some(
    (candidate) => candidate.store.owner.id === parseInt(sellerId),
  );

  const initialValues: CreateBidderValues = {
    auctionId: auction?.id,
    bidderMoney: "",
    estimatedDay: "",
    selfIntroduce: "",
  };

  const onSubmit = async (values: CreateBidderValues, { resetForm }: any) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        auctionId: auction?.id,
        bidderMoney: parseInt(values.bidderMoney),
        estimatedDay: parseInt(values.estimatedDay),
        selfIntroduce: values.selfIntroduce,
      };
      const res = await createBidder(variables, token);
      if (res) {
        resetForm();
        let alert: AlertState = {
          isOpen: true,
          title: "ĐẶT GIÁ THÀNH CÔNG",
          message: "Bạn đã đặt giá thành công cho dự án này!",
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
    <div className="grid gap-9 md:grid-cols-3">
      <div className="col-span-2 flex flex-col gap-3">
        <div className="font-bold text-grey-c900">Đặt giá của bạn</div>
        {!hasSet && (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <div className="flex flex-col gap-3">
                  <MyTextField
                    id="bidderMoney"
                    name="bidderMoney"
                    type="text"
                    title="Số tiền đặt"
                    placeholder="Nhập số tiền bạn muốn nhận"
                    isRequired
                    hasInputNumber
                    endIcon={
                      <FormatEndCurrencyIcon
                        value={
                          formik.values.bidderMoney !== ""
                            ? parseInt(formik.values.bidderMoney)
                            : 0
                        }
                      />
                    }
                    value={formik.values.bidderMoney}
                    onChange={formik.handleChange}
                  />
                  <MyTextField
                    id="estimatedDay"
                    name="estimatedDay"
                    type="number"
                    title="Số ngày hoàn thành"
                    placeholder="Nhập số ngày dự kiến hoàn thành"
                    isRequired
                    value={
                      formik.values.estimatedDay !== ""
                        ? formik.values.estimatedDay
                        : 0
                    }
                    onChange={formik.handleChange}
                  />
                  <MyTextArea
                    id="selfIntroduce"
                    name="selfIntroduce"
                    type="text"
                    title="Giới thiệu"
                    placeholder="Nhập thông tin giới thiệu về bạn và kinh nghiệm làm dự án"
                    isRequired
                    value={formik.values.selfIntroduce}
                    onChange={formik.handleChange}
                  />
                  <Button
                    className="!mt-2 !py-3 hover:!scale-[1.01]"
                    type="submit"
                  >
                    Đặt giá
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {hasSet && (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckRoundedIcon
              sx={{ color: COLORS.primary.c900, fontSize: 120 }}
            />
            <div className="text-base font-medium text-primary-c900">
              Bạn đã đặt giá thành công!
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <div className="font-bold text-grey-c900">
          Lợi ích của việc đặt giá trên Handmade
        </div>
        {benefits.map((benefit: string, index) => (
          <div key={index} className="flex flex-row items-center gap-2">
            <CheckCircleRoundedIcon
              sx={{ fontSize: 20, color: COLORS.primary.c900 }}
            />
            <div className="text-sm text-grey-c900">{benefit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerAuctionInformation;
