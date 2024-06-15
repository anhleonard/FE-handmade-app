import axios from "axios";
import { CreateStoreValues, UpdateStoreValues } from "../types";
import { headerUrl } from "./authentication";

export const createStore = async (variables: CreateStoreValues) => {
  return await axios
    .post(`${headerUrl}/stores/create`, variables)
    .then((res) => res.data);
};

export const allStoreProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/stores/all-store-products`, null, config)
    .then((res) => res.data);
};

export const storeSales = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/stores/sales`, null, config)
    .then((res) => res.data);
};

export const bestSaleProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/stores/best-sale-products`, null, config)
    .then((res) => res.data);
};

export const singleStore = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/stores/single`, null, config)
    .then((res) => res.data);
};

export const updateStore = async (
  variables: UpdateStoreValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/stores/update`, variables, config)
    .then((res) => res.data);
};
