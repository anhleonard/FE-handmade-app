import axios from "axios";
import { headerUrl } from "./authentication";
import { CheckTokenValues } from "../types";

export const checkingAlreadyToken = async (variables: CheckTokenValues) => {
  return await axios
    .post(`${headerUrl}/tokens/checking-already-token`, variables)
    .then((res) => res.data);
};
