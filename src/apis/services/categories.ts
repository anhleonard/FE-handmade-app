import axios from "axios";
import { headerUrl } from "./authentication";

export const getCategories = async () => {
  return await axios.get(`${headerUrl}/categories/`).then((res) => res.data);
};
