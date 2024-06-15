import axios from "axios";
import { headerUrl } from "./authentication";

export const createAddition = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create-addition`, variables, config)
    .then((res) => res.data);
};
