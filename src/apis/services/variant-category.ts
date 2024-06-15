import axios from "axios";
import { headerUrl } from "./authentication";

export const createVariantCategory = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/variant-categories/create`, variables, config)
    .then((res) => res.data);
};

export const getVariantCategoriesByUser = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(
      `${headerUrl}/variant-categories/seller-variant-categories`,
      null,
      config,
    )
    .then((res) => res.data);
};
