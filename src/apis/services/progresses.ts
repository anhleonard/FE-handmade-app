import axios from "axios";
import { headerUrl } from "./authentication";
import { CreateProgressValues, UpdateProgressValues } from "../types";

export const createProgress = async (
  variables: CreateProgressValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create-progress`, variables, config)
    .then((res) => res.data);
};

export const updateProgress = async (
  id: number,
  variables: UpdateProgressValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update-progress/${id}`, variables, config)
    .then((res) => res.data);
};
