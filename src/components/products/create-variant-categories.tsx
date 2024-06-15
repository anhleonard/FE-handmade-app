import Button from "@/libs/button";
import MyTextField from "@/libs/text-field";
import React, { useEffect, useMemo, useState } from "react";
import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import storage from "@/apis/storage";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { createVariantCategory } from "@/apis/services/variant-category";

const validationSchema = yup.object({
  name: yup.string().required("Vui lòng không để trống trường này."),
  // tags: yup.array().min(1, "Vui lòng nhập ít nhất là 1 tag."),
});

const CreateVariantCategoriesModal = () => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const initialValues = { name: "" };
  // const initialValues = useMemo(() => {
  //   return { name: title ?? "", tags: tags ?? [] };
  // }, [tags, title]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: any) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete: any) => {
    setTags(tags.filter((tag: any) => tag !== tagToDelete));
  };

  const onSubmit = async (values: any) => {
    try {
      dispatch(openLoading());
      const variables = {
        title: values?.name,
        values: tags,
      };

      const token = storage.getLocalAccessToken();
      const response = await createVariantCategory(variables, token);
      if (response) {
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Tạo phân loại thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        dispatch(closeModal());
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  const handleKeyDown = (event: any) => {
    if (event?.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form onKeyDown={handleKeyDown}>
          <div className="space-y-4 py-4">
            <MyTextField
              id="name"
              name="name"
              title="Tên phân loại"
              placeholder="Nhập tên phân loại. Ví dụ: Kích cỡ"
              value={formik.values.name}
              onChange={formik.handleChange}
              isError={
                getIn(formik.touched, "name") &&
                Boolean(getIn(formik.errors, "name"))
              }
              helperText={
                getIn(formik.touched, "name") && getIn(formik.errors, "name")
              }
            />
            <div className="space-y-4">
              {tags.map((tag: any, index: number) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  style={{ margin: "4px" }}
                  color="warning"
                />
              ))}
              <MyTextField
                id="tags"
                name="tags"
                title="Tên tùy chọn"
                placeholder="Nhập tên tùy chọn. Ví dụ: XXL"
                className="mt-1 w-full"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyPress}
                // isError={
                //   getIn(formik.touched, "tags") &&
                //   Boolean(getIn(formik.errors, "tags"))
                // }
                // helperText={
                //   getIn(formik.touched, "tags") && getIn(formik.errors, "tags")
                // }
              />
              <div className="flex items-center justify-center pt-2">
                <Button
                  type="submit"
                  className="!min-w-[120px]"
                  onClick={() => handleClick()}
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateVariantCategoriesModal;
