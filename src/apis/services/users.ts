import axios from "axios";
import { UpdateSellerValues } from "../types";
import { headerUrl } from "./authentication";

export const updateSeller = async (
  id: number,
  variables: UpdateSellerValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/users/update/${id}`, variables, config)
    .then((res) => res.data);
};
