import axios from "axios";
import { headerUrl } from "./authentication";

export const filterAuctions = async (query?: any) => {
  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/auctions/filter?${params}`;

  console.log({ url });

  return await axios.get(url).then((res) => res.data);
};

export const singleAuction = async (id: number) => {
  const url = `${headerUrl}/auctions/${id}`;

  return await axios.get(url).then((res) => res.data);
};

export const createBidder = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create-bidder`, variables, config)
    .then((res) => res.data);
};

export const allSellerAuctions = async (token: string, variables: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/seller-auctions`, variables, config)
    .then((res) => res.data);
};

export const updateAuction = async (
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
    .put(`${headerUrl}/auctions/update/${id}`, variables, config)
    .then((res) => res.data);
};
