import axios from "axios";
import { headerUrl } from "./authentication";
import { CreateCollectionValues, UpdateCollectionValues } from "../types";

export const addProductCollection = async (
  variables: CreateCollectionValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/collections/create`, variables, config)
    .then((res) => res.data);
};

export const singleCollection = async (collectId: number) => {
  return await axios
    .get(`${headerUrl}/collections/${collectId}`)
    .then((res) => res.data);
};

export const updateCollection = async (
  collectId: number,
  variables: UpdateCollectionValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${headerUrl}/collections/update/${collectId}`;

  return await axios.put(url, variables, config).then((res) => res.data);
};

export const storeCollections = async (sellerId: number, query?: any) => {
  const queryString = new URLSearchParams(query).toString();

  const url = `${headerUrl}/collections/seller/${sellerId}?${queryString}`;

  return await axios.get(url).then((res) => res.data);
};
