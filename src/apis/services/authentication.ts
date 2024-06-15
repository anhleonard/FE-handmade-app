import axios from "axios";
import { LoginFormValues } from "../types";

export let headerUrl = `${process.env.NEXT_PUBLIC_BK_PROTOCOL}${process.env.NEXT_PUBLIC_BK_HOST}:${process.env.NEXT_PUBLIC_BK_PORT}`;

export const loginUser = async (variables: LoginFormValues) => {
  return await axios
    .post(`${headerUrl}/users/signin`, variables)
    .then((res) => res.data);
};

export const signUpUser = async (variables: any) => {
  return await axios
    .post(`${headerUrl}/users/signup`, variables)
    .then((res) => res.data);
};
