import axios from "axios";
import { CreateStoreValues } from "../types";
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
