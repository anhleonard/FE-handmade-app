import axios from "axios";
import { headerUrl } from "./authentication";
import { CancelOrderValues, OrderStatusValues } from "../types";

export const ordersByStatus = async (
  token: string,
  variables?: OrderStatusValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const values = variables?.status ? variables : null;

  return await axios
    .post(`${headerUrl}/orders/seller-orders`, values, config)
    .then((res) => res.data);
};

export const singleOrder = async (orderId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${headerUrl}/orders/${orderId}`, config)
    .then((res) => res.data);
};

export const updateOrder = async (
  orderId: number,
  token: string,
  variables: OrderStatusValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/update/${orderId}`, variables, config)
    .then((res) => res.data);
};

export const updateReadyForAdmin = async (orderId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/update-ready-delivery/${orderId}`, null, config)
    .then((res) => res.data);
};

export const cancelOrder = async (
  orderId: number,
  token: string,
  variables: CancelOrderValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/cancel/${orderId}`, variables, config)
    .then((res) => res.data);
};

export const filterSellerOrders = async (token: string, query: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const queryString = new URLSearchParams(query).toString();

  return await axios
    .get(`${headerUrl}/orders/seller-filter-orders?${queryString}`, config)
    .then((res) => res.data);
};
