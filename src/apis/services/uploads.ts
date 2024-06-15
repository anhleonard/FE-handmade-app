import axios from "axios";
import { headerUrl } from "./authentication";

export const uploadImages = async (files: any) => {
  return await axios
    .post(`${headerUrl}/products/uploads`, files)
    .then((res) => res.data);
};

export const uploadSingleImage = async (image: any) => {
  return await axios
    .post(`${headerUrl}/products/upload-image`, image)
    .then((res) => res.data);
};
