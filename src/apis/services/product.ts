import axios from "axios";
import { headerUrl } from "./authentication";

export const createProduct = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/create`, variables, config)
    .then((res) => res.data);
};

export const getSellerProducts = async (token: string, query: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const queryString = new URLSearchParams(query).toString();

  return await axios
    .post(`${headerUrl}/products/seller-products?${queryString}`, null, config)
    .then((res) => res.data);
};

export const getPendingProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/pending-products`, null, config)
    .then((res) => res.data);
};

export const getSellingProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/selling-products`, null, config)
    .then((res) => res.data);
};

export const getViolateProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/violate-products`, null, config)
    .then((res) => res.data);
};

export const getOffProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/off-products`, null, config)
    .then((res) => res.data);
};

export const singleProduct = async (id: number) => {
  return await axios.get(`${headerUrl}/products/${id}`).then((res) => res.data);
};

export const deleteProduct = async (id: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .delete(`${headerUrl}/products/delete/${id}`, config)
    .then((res) => res.data);
};

export const updateProductBySeller = async (
  id: number,
  variables: any,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/products/update/${id}`, variables, config)
    .then((res) => res.data);
};

export const updateProductVariants = async (id: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/products/update-product-variants/${id}`, null, config)
    .then((res) => res.data);
};
