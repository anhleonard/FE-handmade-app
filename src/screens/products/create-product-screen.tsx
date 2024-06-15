"use client";
import { WarningIcon } from "@/enum/icons";
import MyDatePicker from "@/libs/date-picker";
import MyTextField from "@/libs/text-field";
import MyTextArea from "@/libs/text-area";
import UploadImage from "@/libs/upload-image";
import Button from "@/libs/button";
import { useEffect, useState } from "react";
import { AlertStatus, yesNoOptions } from "@/enum/constants";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { UploadFile } from "antd";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import CateGoriesPicker, { Label } from "./selected-categories";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getCategories } from "@/apis/services/categories";
import { AlertState } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";
import { getVariantCategoriesByUser } from "@/apis/services/variant-category";
import { Checkbox, Chip, FormControlLabel, FormGroup } from "@mui/material";
import SelectedVariants from "./selected-variants";
import BuildClassificationsModal from "@/components/products/build-classifications";
import { SCREEN } from "@/enum/setting";
import { openModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { deleteVariant } from "@/apis/services/variants";
import { uploadImages } from "@/apis/services/uploads";
import { createProduct } from "@/apis/services/product";

const validationSchema = yup.object({
  productName: yup.string().required("Vui lòng không để trống trường này."),
  productCode: yup.string().required("Vui lòng không để trống trường này."),
  description: yup.string().required("Vui lòng không để trống trường này."),
  materials: yup.string().required("Vui lòng không để trống trường này."),
  mainColors: yup.string().required("Vui lòng không để trống trường này."),
  uses: yup.string().required("Vui lòng không để trống trường này."),
  isMultipleClasses: yup.boolean(),
  isHeavyGood: yup.boolean(),
  price: yup.number().when("isMultipleClasses", ([isMultipleClasses], sch) => {
    return isMultipleClasses === false
      ? sch
          .min(1, "Số lượng phải lớn hơn 0")
          .required("Vui lòng không để trống trường này.")
      : sch.notRequired();
  }),
  inventoryNumber: yup
    .number()
    .when("isMultipleClasses", ([isMultipleClasses], sch) => {
      return isMultipleClasses === false
        ? sch
            .min(1, "Số lượng phải lớn hơn 0")
            .required("Vui lòng không để trống trường này.")
        : sch.notRequired();
    }),
});

const CreateProductScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const [isClassified, setIsClassified] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [variants, setVariants] = useState<any>([]);

  const initialValues = {
    productName: "",
    productCode: "",
    description: "",
    materials: "",
    mainColors: "",
    uses: "",
    price: 0,
    inventoryNumber: 0,
    isHeavyGood: false,
    isMultipleClasses: false,
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      dispatch(openLoading());

      let variables = {};

      if (variants?.length !== 0) {
        //check xem variants có rỗng không
        variables = {
          ...values,
          categoryId: selectedLabels,
          sampleVariants: variants,
        };
      } else {
        const formData = new FormData();

        if (fileList && fileList.length >= 1) {
          for (let i = 0; i < fileList.length; i++) {
            const fileObj = fileList[i].originFileObj;
            if (fileObj) {
              formData.append(`files`, fileObj);
            }
          }
        }

        const res = await uploadImages(formData); // get images url
        variables = {
          ...values,
          price: parseInt(values?.price),
          categoryId: selectedLabels,
          images: res,
        };
      }

      const token = storage.getLocalAccessToken();

      const response = await createProduct(variables, token);

      if (response) {
        router.push("/products/list-products");

        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Tạo sản phẩm thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
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

  const showAddClassModal = () => {
    const modal = {
      isOpen: true,
      title: "Thêm phân loại cho sản phẩm",
      content: (
        <BuildClassificationsModal
          onSubmitCallback={(res: any) => handleClassificationAdded(res)}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleClassificationAdded = (res: any) => {
    if (res) {
      variants.push(res);
      setVariants(variants);
    }
    dispatch(refetchComponent());
  };

  const handleDeleteVariantItem = async (id: number, index: number) => {
    //index thứ tự của variant đó trong mảng state variants
    try {
      dispatch(openLoading());
      await deleteVariant(id);
      variants.splice(index, 1);
      setVariants(variants);
      dispatch(refetchComponent());
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
    <div className="w-full rounded-lg bg-white px-8 py-4">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">Tạo sản phẩm mới</div>
        <div className="item-start flex gap-1 md:items-center">
          <WarningIcon />
          <div className="text-xs font-normal">
            Vui lòng nhập chính xác các thông tin dưới đây để ban kiểm duyệt có
            thể thông qua sản phẩm, tránh các vấn đề vi phạm.
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
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
                isError={
                  getIn(formik.touched, "productName") &&
                  Boolean(getIn(formik.errors, "productName"))
                }
                helperText={
                  getIn(formik.touched, "productName") &&
                  getIn(formik.errors, "productName")
                }
              />
              <MyTextField
                id="productCode"
                name="productCode"
                title="Mã sản phẩm"
                placeholder="Nhập mã sản phẩm"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.productCode}
                isError={
                  getIn(formik.touched, "productCode") &&
                  Boolean(getIn(formik.errors, "productCode"))
                }
                helperText={
                  getIn(formik.touched, "productCode") &&
                  getIn(formik.errors, "productCode")
                }
              />

              {/* <CheckboxesGroup /> */}

              <CateGoriesPicker
                labels={labels}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
              />

              <MyTextArea
                id="description"
                name="description"
                title="Mô tả sản phẩm"
                placeholder="Nhập mô tả cho sản phẩm của bạn"
                onChange={formik.handleChange}
                value={formik.values.description}
                isError={
                  getIn(formik.touched, "description") &&
                  Boolean(getIn(formik.errors, "description"))
                }
                helperText={
                  getIn(formik.touched, "description") &&
                  getIn(formik.errors, "description")
                }
              />
              <MyTextField
                id="materials"
                name="materials"
                title="Chất liệu"
                placeholder="Nhập các chất liệu tạo nên sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.materials}
                isError={
                  getIn(formik.touched, "materials") &&
                  Boolean(getIn(formik.errors, "materials"))
                }
                helperText={
                  getIn(formik.touched, "materials") &&
                  getIn(formik.errors, "materials")
                }
              />
              <MyTextField
                id="mainColors"
                name="mainColors"
                title="Màu sắc chủ đạo"
                placeholder="Nhập màu sắc chủ đạo của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.mainColors}
                isError={
                  getIn(formik.touched, "mainColors") &&
                  Boolean(getIn(formik.errors, "mainColors"))
                }
                helperText={
                  getIn(formik.touched, "mainColors") &&
                  getIn(formik.errors, "mainColors")
                }
              />
              <MyTextField
                id="uses"
                name="uses"
                title="Công dụng"
                placeholder="Nhập công dụng của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.uses}
                isError={
                  getIn(formik.touched, "uses") &&
                  Boolean(getIn(formik.errors, "uses"))
                }
                helperText={
                  getIn(formik.touched, "uses") && getIn(formik.errors, "uses")
                }
              />

              <div className="my-1 flex flex-row gap-8">
                <MyRadioButtonsGroup
                  label="Có phải hàng hóa nặng không?"
                  isRequired
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
                  isRequired
                  options={yesNoOptions}
                  defaultValue={yesNoOptions[1].value}
                  onChanged={(value) => {
                    if (value === yesNoOptions[0].value)
                      formik.values.isMultipleClasses = true;
                    else formik.values.isMultipleClasses = false;

                    if (value === yesNoOptions[0].value) {
                      setIsClassified(true);
                    } else {
                      setIsClassified(false);
                    }
                  }}
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
                    />
                  </div>
                  <div className="flex flex-row items-start justify-between gap-8">
                    <MyTextField
                      type="text"
                      id="price"
                      name="price"
                      title="Số tiền"
                      placeholder="Số tiền bán của 1 sản phẩm"
                      isRequired
                      hasInputNumber
                      endIcon={
                        <FormatEndCurrencyIcon value={formik.values.price} />
                      }
                      className="w-1/2"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                      isError={
                        getIn(formik.touched, "price") &&
                        Boolean(getIn(formik.errors, "price"))
                      }
                      helperText={
                        getIn(formik.touched, "price") &&
                        getIn(formik.errors, "price")
                      }
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
                      isError={
                        getIn(formik.touched, "inventoryNumber") &&
                        Boolean(getIn(formik.errors, "inventoryNumber"))
                      }
                      helperText={
                        getIn(formik.touched, "inventoryNumber") &&
                        getIn(formik.errors, "inventoryNumber")
                      }
                    />
                  </div>
                </div>
              )}
              {isClassified && (
                <div className={`flex flex-col ${variants?.length && "gap-4"}`}>
                  <Button
                    className="!w-fit !px-3 !text-xs"
                    color="info"
                    onClick={() => showAddClassModal()}
                  >
                    Thêm phân loại
                  </Button>
                  <div className="flex flex-row flex-wrap items-center gap-3">
                    {variants?.map((variant: any, index: number) => {
                      const names = variant?.variantItems?.map(
                        (variantItem: any) => variantItem?.name,
                      );
                      const result = names.join(" - ");
                      return (
                        <Chip
                          key={index}
                          label={result}
                          onDelete={() =>
                            handleDeleteVariantItem(variant?.id, index)
                          }
                          color="warning"
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-4 flex flex-row items-center justify-center border-t-2 border-dashed border-t-grey-c100 py-8">
                <Button
                  color="primary"
                  type="submit"
                  className="h-12 w-1/3 text-xs md:text-sm lg:text-base"
                  // onClick={() => handleUpload()}
                >
                  Kiểm duyệt và bật bán
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductScreen;
