"use client";
import { headerUrl } from "@/apis/services/authentication";
import { getCategories } from "@/apis/services/categories";
import {
  updateProductBySeller,
  updateProductVariants,
} from "@/apis/services/product";
import { uploadImages, uploadSingleImage } from "@/apis/services/uploads";
import { updateSimpleVariant } from "@/apis/services/variants";
import storage from "@/apis/storage";
import MyEditMultipleChoices from "@/components/variants/edit-multiple-choices";
import { AlertStatus, ProductStatus, yesNoOptions } from "@/enum/constants";
import { AlertState, Product, UpdateVariant } from "@/enum/defined-type";
import Button from "@/libs/button";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import UploadImage from "@/libs/upload-image";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import CateGoriesPicker, {
  Label,
} from "@/screens/products/selected-categories";
import { UploadFile } from "antd";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  product: Product;
  handleRefetch: () => void;
  updateTextButton?: string;
};

const EditTotalProductModal = ({
  product,
  handleRefetch,
  updateTextButton = "Cập nhật",
}: Props) => {
  const dispatch = useDispatch();
  const cateIds = product?.category?.map((cate) => cate.id);
  const [isClassified, setIsClassified] = useState<boolean>(
    product?.isMultipleClasses,
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<number[]>(cateIds);

  const [fixedVariants, setFixedVariants] = useState<UpdateVariant[]>([]);

  const defaultImages: UploadFile[] = [];
  if (product?.images?.length) {
    for (let image of product?.images) {
      const item: UploadFile = {
        uid: Math.random().toString(),
        name: image,
        url: `${headerUrl}/products/${image}`,
        status: "done",
      };
      defaultImages.push(item);
    }
  }

  const initialValues = {
    productName: product?.productName ?? "",
    productCode: product?.productCode ?? "",
    description: product?.description ?? "",
    materials: product?.materials ?? "",
    mainColors: product?.mainColors ?? "",
    uses: product?.uses ?? "",
    price: product?.price ?? 0,
    inventoryNumber: product?.inventoryNumber ?? 0,
    isHeavyGood: product?.isHeavyGood ?? false,
    isMultipleClasses: product?.isMultipleClasses ?? false,
  };

  const handleUpdateVariants = (fixedVariant: UpdateVariant) => {
    if (fixedVariant) {
      setFixedVariants((prevVariants) => {
        const variantIndex = prevVariants.findIndex(
          (v) => v.id === fixedVariant.id,
        );
        if (variantIndex !== -1) {
          const updatedVariants = [...prevVariants];
          updatedVariants[variantIndex] = fixedVariant;
          return updatedVariants;
        } else {
          return [...prevVariants, fixedVariant];
        }
      });
    }
  };

  const handleChangeVariants = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();

      for (let fixedVariant of fixedVariants) {
        let uploadedImage = "";
        if (fixedVariant?.fileImage) {
          //upload new image
          const formData = new FormData();

          if (fixedVariant?.fileImage) {
            formData.append("image", fixedVariant.fileImage);
          } else {
            let alert: AlertState = {
              isOpen: true,
              title: "LỖI",
              message: "Không thể upload ảnh!",
              type: AlertStatus.ERROR,
            };
            dispatch(openAlert(alert));
            break;
          }

          uploadedImage = await uploadSingleImage(formData);
        }

        let variables = {
          unitPrice: fixedVariant?.unitPrice,
          inventoryNumber: fixedVariant?.inventoryNumber,
          image: fixedVariant?.fileImage ? uploadedImage : fixedVariant?.image,
        };

        //update variant
        await updateSimpleVariant(fixedVariant?.id, variables, token);
      }
      //update product sau khi update variant
      await updateProductVariants(product?.id, token);
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

  //handle change product
  const onSubmit = async (values: any) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      if (product?.isMultipleClasses) {
        await handleChangeVariants();
        const { price, inventoryNumber, ...updatedVariables } = values;
        const res = await updateProductBySeller(
          product.id,
          updatedVariables,
          token,
        );
        if (res) {
          dispatch(closeModal());
          handleRefetch();
        }
      } else {
        // ---------- START EDIT IMAGES ---------- //
        let newUrls: string[] = [];

        let rawFiles: UploadFile[] = [];
        if (fileList?.length) rawFiles = fileList;
        else if (defaultImages?.length) rawFiles = defaultImages;

        if (rawFiles?.length) {
          //lọc lấy các ảnh default
          const urlImages = rawFiles
            .filter((file) => file?.originFileObj === undefined)
            ?.map((file) => file.name);

          //tạo url cho các ảnh mới
          const formData = new FormData();

          if (rawFiles && rawFiles.length >= 1) {
            for (let i = 0; i < rawFiles.length; i++) {
              if (rawFiles[i]?.originFileObj) {
                const fileObj = rawFiles[i].originFileObj;
                if (fileObj) {
                  formData.append(`files`, fileObj);
                }
              }
            }
          }

          const res = await uploadImages(formData);
          if (res) {
            newUrls = [...urlImages, ...res];
          } else {
            let alert: AlertState = {
              isOpen: true,
              title: "LỖI",
              message: "Lỗi upload ảnh!",
              type: AlertStatus.ERROR,
            };
            dispatch(openAlert(alert));

            return;
          }
        }
        // ---------- END EDIT IMAGES ---------- //

        const params = {
          ...values,
          price: parseInt(values?.price),
          ...(newUrls?.length && {
            images: newUrls,
          }),
          ...(product?.status === ProductStatus.VIOLATE && {
            status: ProductStatus.PENDING,
          }),
          categoryId: selectedLabels,
        };

        const res = await updateProductBySeller(product.id, params, token);

        if (res) {
          dispatch(closeModal());
          handleRefetch();
        }
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

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res = await getCategories();
      setLabels(res);
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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="flex flex-col gap-3">
              <MyTextField
                id="productName"
                name="productName"
                title="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.productName}
                isRequired={false}
              />
              <MyTextField
                id="productCode"
                name="productCode"
                title="Mã sản phẩm"
                placeholder="Nhập mã sản phẩm"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.productCode}
                isRequired={false}
              />

              {labels ? (
                <CateGoriesPicker
                  labels={labels}
                  selectedLabels={selectedLabels}
                  setSelectedLabels={setSelectedLabels}
                />
              ) : null}

              <MyTextArea
                id="description"
                name="description"
                title="Mô tả sản phẩm"
                placeholder="Nhập mô tả cho sản phẩm của bạn"
                onChange={formik.handleChange}
                value={formik.values.description}
                isRequired={false}
                rows={6}
              />
              <MyTextField
                id="materials"
                name="materials"
                title="Chất liệu"
                placeholder="Nhập các chất liệu tạo nên sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.materials}
                isRequired={false}
              />
              <MyTextField
                id="mainColors"
                name="mainColors"
                title="Màu sắc chủ đạo"
                placeholder="Nhập màu sắc chủ đạo của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.mainColors}
                isRequired={false}
              />
              <MyTextArea
                id="uses"
                name="uses"
                title="Công dụng"
                placeholder="Nhập công dụng của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.uses}
                isRequired={false}
                rows={6}
              />

              <div className="my-1 flex flex-row gap-8">
                <MyRadioButtonsGroup
                  label="Có phải hàng hóa nặng không?"
                  options={yesNoOptions}
                  defaultValue={yesNoOptions[1].value}
                  onChanged={(value) => {
                    if (value === yesNoOptions[0].value)
                      formik.values.isHeavyGood = true;
                    else formik.values.isHeavyGood = false;
                  }}
                />
                <MyRadioButtonsGroup
                  label="Có nhiều phân loại không?"
                  disabled
                  options={yesNoOptions}
                  defaultValue={
                    !isClassified
                      ? yesNoOptions[1].value
                      : yesNoOptions[0].value
                  }
                />
              </div>
              {!isClassified && (
                <div>
                  <div>
                    <div className="mb-2 block text-sm font-medium text-grey-c600 dark:text-white">
                      Thêm hình ảnh mô tả
                    </div>
                    <UploadImage
                      fileList={fileList}
                      setFileList={setFileList}
                      defaultFileList={defaultImages}
                    />
                  </div>
                  <div className="flex flex-row items-start justify-between gap-8">
                    <MyTextField
                      type="text"
                      id="price"
                      name="price"
                      title="Số tiền"
                      placeholder="Số tiền bán của 1 sản phẩm"
                      hasInputNumber
                      endIcon={
                        <FormatEndCurrencyIcon value={formik.values.price} />
                      }
                      className="w-1/2"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                      isRequired={false}
                    />
                    <MyTextField
                      id="inventoryNumber"
                      name="inventoryNumber"
                      title="Số lượng tồn kho"
                      placeholder="Số lượng tồn của sản phẩm"
                      type="number"
                      className="w-1/2"
                      onChange={formik.handleChange}
                      value={formik.values.inventoryNumber}
                      isRequired={false}
                    />
                  </div>
                </div>
              )}
              {product?.isMultipleClasses && product?.variants && (
                <MyEditMultipleChoices
                  variants={product?.variants}
                  handleUpdateVariants={handleUpdateVariants}
                />
              )}

              <div className="mt-4 flex flex-row items-center justify-center border-t-2 border-dashed border-t-grey-c100 py-8">
                <Button
                  color="primary"
                  type="submit"
                  className="h-12 w-1/3 !min-w-[200px] text-xs md:text-sm lg:text-base"
                >
                  {updateTextButton}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTotalProductModal;
