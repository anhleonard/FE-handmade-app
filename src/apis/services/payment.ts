import axios from "axios";
import { CreateRefundPaymentValues, PaidAuctionValues } from "../types";
import { headerUrl } from "./authentication";

export const createRefundPayment = async (
  variables: CreateRefundPaymentValues,
) => {
  return await axios
    .post(`${headerUrl}/payment/refund`, variables)
    .then((res) => res.data);
};

export const updatePaidAuction = async (
  variables: PaidAuctionValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update-paid-auction`, variables, config)
    .then((res) => res.data);
};
