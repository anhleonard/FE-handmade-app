import { headerUrl } from "@/apis/services/authentication";
import { UpdateStoreValues } from "@/apis/types";
import { AlertState, Store } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import MainInputImage from "@/libs/main-input-image";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { uploadSingleImage } from "@/apis/services/uploads";
import storage from "@/apis/storage";
import { updateStore } from "@/apis/services/stores";
import { closeModal } from "@/redux/slices/modalSlice";

type Props = {
  store: Store;
  handleRefetch: () => void;
};

const EditStoreModal = ({ store, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const currentStoreName = store?.name;

  const [previewImage, setPreviewImage] = useState(
    `${headerUrl}/products/${store?.avatar}`,
  );
  const [fileImage, setFileImage] = useState<File | null>();

  const initialValues: UpdateStoreValues = {
    name: store?.name ?? "",
    avatar: store?.avatar ?? "",
    mainBusiness: store?.mainBusiness ?? "",
    description: store?.description ?? "",
    address: store?.address ?? "",
  };

  const onSubmit = async (values: UpdateStoreValues) => {
    //update store avatar
    let newAvatar: string = "";
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      const file = await uploadSingleImage(formData);
      if (file) newAvatar = file;
    } else if (!fileImage && previewImage === "") {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể upload ảnh!",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
      return;
    }

    try {
      dispatch(openLoading());
      const variables: UpdateStoreValues = {
        description: values?.description,
        mainBusiness: values?.mainBusiness,
        address: values?.address,
        ...(newAvatar !== "" && {
          avatar: newAvatar,
        }),
        ...(values?.name !== currentStoreName && {
          name: values?.name,
        }),
      };

      const token = storage.getLocalAccessToken();
      const res = await updateStore(variables, token);
      if (res) {
        dispatch(closeModal());
        handleRefetch();
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="flex flex-col items-center justify-center gap-4 py-2">
            <MainInputImage
              id="store-logo"
              name="store-logo"
              previewImage={previewImage}
              width="!w-[120px]"
              height="!h-[120px]"
              rounded="!rounded-full"
              onChange={(event) => {
                setFileImage(event.target.files?.[0]);
                setPreviewImage(
                  URL.createObjectURL(event.target.files?.[0] ?? new Blob()),
                );
              }}
              onDeleteImage={() => {
                setFileImage(null);
                setPreviewImage("");
              }}
            />

            <MyTextField
              id="name"
              name="name"
              title="Tên cửa hàng"
              isRequired={false}
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <MyTextField
              id="mainBusiness"
              name="mainBusiness"
              title="Ngành hàng chủ lực"
              isRequired={false}
              value={formik.values.mainBusiness}
              onChange={formik.handleChange}
            />

            <MyTextArea
              id="description"
              name="description"
              title="Mô tả"
              isRequired={false}
              rows={7}
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <MyTextField
              id="address"
              name="address"
              title="Địa chỉ"
              isRequired={false}
              value={formik.values.address}
              onChange={formik.handleChange}
            />

            <Button className="!my-4 !w-fit !min-w-[200px]" type="submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditStoreModal;
