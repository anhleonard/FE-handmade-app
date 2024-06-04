import { ChangeStoreValues } from "@/apis/types";
import { AlertState, Store } from "@/enum/defined-type";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import MyTextField from "@/libs/text-field";
import Link from "next/link";
import MyTextArea from "@/libs/text-area";
import Button from "@/libs/button";
import MainInputImage from "@/libs/main-input-image";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { headerUrl } from "@/apis/services/authentication";
import { uploadSingleImage } from "@/apis/services/uploads";
import storage from "@/apis/storage";
import { updateStore } from "@/apis/services/stores";
import { closeModal } from "@/redux/slices/modalSlice";

type Props = {
  store?: Store;
  handleRefetch: () => void;
};

const ChangeStoreModal = ({ store, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const currentStoreName = store?.name;

  const [previewImage, setPreviewImage] = useState(
    `${headerUrl}/products/${store?.avatar}`,
  );
  const [frontCard, setFrontCard] = useState(
    `${headerUrl}/products/${store?.owner?.frontCard}`,
  );
  const [backCard, setBackCard] = useState(
    `${headerUrl}/products/${store?.owner?.backCard}`,
  );
  const [fileImage, setFileImage] = useState<File | null>();
  const [fileFrontCard, setFileFrontCard] = useState<File | null>();
  const [fileBackCard, setFileBackCard] = useState<File | null>();

  const initialValues: ChangeStoreValues = {
    name: store?.name ?? "",
    mainBusiness: store?.mainBusiness ?? "",
    description: store?.description ?? "",
    avatar: store?.avatar ?? "",
    frontCard: store?.owner?.frontCard ?? "",
    backCard: store?.owner?.backCard ?? "",
    address: store?.address ?? "",
    notApproveReason: store?.notApproveReason ?? "",
  };

  const onSubmit = async (values: ChangeStoreValues) => {
    try {
      //check rỗng image
      if (
        (!fileImage && previewImage === "") ||
        (!fileFrontCard && frontCard === "") ||
        (!fileBackCard && backCard === "")
      ) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Vui lòng upload đầy đủ thông tin ảnh!",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
        return;
      }

      dispatch(openLoading());

      //update store avatar
      let newAvatar: string = "";
      const formData = new FormData();
      if (fileImage) {
        formData.append("image", fileImage);
        const file = await uploadSingleImage(formData);
        if (file) newAvatar = file;
      }

      // update front card
      let newFrontCard: string = "";
      const formFrontCardData = new FormData();
      if (fileFrontCard) {
        formFrontCardData.append("image", fileFrontCard);
        const frontFile = await uploadSingleImage(formFrontCardData);
        if (frontFile) newFrontCard = frontFile;
      }

      // update back card
      let newBackCard: string = "";
      const formBackCardData = new FormData();
      if (fileBackCard) {
        formBackCardData.append("image", fileBackCard);
        const backFile = await uploadSingleImage(formBackCardData);
        if (backFile) newBackCard = backFile;
      }

      const variables: ChangeStoreValues = {
        description: values?.description,
        mainBusiness: values?.mainBusiness,
        address: values?.address,
        ...(newAvatar !== "" && {
          avatar: newAvatar,
        }),
        ...(frontCard !== "" && {
          frontCard: newFrontCard,
        }),
        ...(backCard !== "" && {
          backCard: newBackCard,
        }),
        ...(values?.name !== currentStoreName && {
          name: values?.name,
        }),
        notApproveReason: null,
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
    <div className="px-4 py-4">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center">
                <MainInputImage
                  id="avatar"
                  name="avatar"
                  previewImage={previewImage}
                  width="!w-[130px]"
                  height="!h-[130px]"
                  rounded="!rounded-full"
                  onChange={(event) => {
                    setFileImage(event.target.files?.[0]);
                    setPreviewImage(
                      URL.createObjectURL(
                        event.target.files?.[0] ?? new Blob(),
                      ),
                    );
                  }}
                  onDeleteImage={() => {
                    setFileImage(null);
                    setPreviewImage("");
                  }}
                />
              </div>
              <MyTextField
                id="name"
                name="name"
                title="Tên cửa hàng"
                isRequired={false}
                placeholder="Nhập tên cửa hàng của bạn"
                helperText={
                  <div className="text-grey-c800">
                    Vui lòng nhập tên gian hàng theo đúng quy định{" "}
                    <Link
                      href={""}
                      className="font-bold text-blue-c800 underline"
                    >
                      Tìm hiểu thêm
                    </Link>
                  </div>
                }
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              <MyTextField
                id="mainBusiness"
                name="mainBusiness"
                title="Ngành hàng chủ lực"
                isRequired={false}
                placeholder="Ngành hàng chủ lực"
                value={formik.values.mainBusiness}
                onChange={formik.handleChange}
              />

              <MyTextArea
                id="description"
                name="description"
                title="Mô tả"
                isRequired={false}
                placeholder="Nhập mô tả cho cửa hàng của bạn"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={7}
              />

              <MyTextField
                id="address"
                name="address"
                title="Địa chỉ"
                isRequired={false}
                placeholder="Nhập địa chỉ của cửa hàng của bạn"
                value={formik.values.address}
                onChange={formik.handleChange}
              />

              <div className="grid w-full grid-cols-2 gap-8 pt-3">
                <div className="flex w-full flex-col items-center gap-2">
                  <MainInputImage
                    id="frontCard"
                    name="frontCard"
                    previewImage={frontCard}
                    width="!w-full"
                    height="!h-[200px]"
                    rounded="!rounded-2xl"
                    className="w-full"
                    onChange={(event) => {
                      setFileFrontCard(event.target.files?.[0]);
                      setFrontCard(
                        URL.createObjectURL(
                          event.target.files?.[0] ?? new Blob(),
                        ),
                      );
                    }}
                    onDeleteImage={() => {
                      setFileFrontCard(null);
                      setFrontCard("");
                    }}
                  />
                  <div className="text-sm font-medium text-grey-c900">
                    Mặt trước
                  </div>
                </div>
                <div className="flex w-full flex-col items-center gap-2">
                  <MainInputImage
                    id="backCard"
                    name="backCard"
                    previewImage={backCard}
                    width="!w-full"
                    height="!h-[200px]"
                    rounded="!rounded-2xl"
                    className="w-full"
                    onChange={(event) => {
                      setFileBackCard(event.target.files?.[0]);
                      setBackCard(
                        URL.createObjectURL(
                          event.target.files?.[0] ?? new Blob(),
                        ),
                      );
                    }}
                    onDeleteImage={() => {
                      setFileBackCard(null);
                      setBackCard("");
                    }}
                  />
                  <div className="text-sm font-medium text-grey-c900">
                    Mặt sau
                  </div>
                </div>
              </div>

              <Button className="!w-fit !py-3" type="submit">
                Gửi lại thông tin để kiểm duyệt
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeStoreModal;
