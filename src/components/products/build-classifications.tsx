import { getVariantCategoriesByUser } from "@/apis/services/variant-category";
import storage from "@/apis/storage";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-type";
import Button from "@/libs/button";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MainInputImage from "@/libs/main-input-image";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import SelectedVariants from "@/screens/products/selected-variants";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import axios from "axios";
import { uploadSingleImage } from "@/apis/services/uploads";
import { createVariants } from "@/apis/services/variants";
import { closeModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";

interface CustomObject {
  [key: string]: { value: number; label: string };
}

const validationSchema = yup.object({
  unitPrice: yup
    .number()
    .min(1, "Vui lòng nhập số lượng >= 1")
    .required("Vui lòng không để trống trường này."),
  inventoryNumber: yup
    .number()
    .min(1, "Vui lòng nhập số lượng >= 1")
    .required("Vui lòng không để trống trường này."),
});

type Props = {
  onSubmitCallback: any;
};

const BuildClassificationsModal = ({ onSubmitCallback }: Props) => {
  const dispatch = useDispatch();
  const [variantCategories, setVariantCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState<CustomObject>({});
  const [previewImage, setPreviewImage] = useState("");
  const [fileImage, setFileImage] = useState<File | null>();

  const initialValues = { unitPrice: 0, inventoryNumber: 0 };

  const getAllVariantCategoriesByUser = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await getVariantCategoriesByUser(token);

      if (res) {
        const updatedData = res.map((item: any) => ({
          ...item,
          variantItems: item?.variantItems
            .map((variant: any) => ({
              value: variant.id,
              label: variant.name,
            }))
            ?.reverse(),
        }));

        setVariantCategories(updatedData);
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

  useEffect(() => {
    getAllVariantCategoriesByUser();
  }, []);

  const extractVariantItemIds = (obj: CustomObject): number[] => {
    const ids: number[] = [];

    Object.values(obj).forEach((prop) => {
      if (prop && prop.value !== undefined) {
        ids.push(prop.value);
      }
    });

    return ids;
  };

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    console.log(extractVariantItemIds(selectedItems));

    if (fileImage) {
      formData.append("image", fileImage);
    } else {
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
      const ids = extractVariantItemIds(selectedItems);
      const file = await uploadSingleImage(formData);

      const variables = {
        unitPrice: parseInt(values?.unitPrice),
        inventoryNumber: parseInt(values?.inventoryNumber),
        image: file,
        variantItemIds: ids,
      };

      const token = storage.getLocalAccessToken();
      const res = await createVariants(variables, token);
      onSubmitCallback(res);
      dispatch(closeModal());
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
      // dispatch(refetchComponent());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="space-y-4 py-2">
            <SelectedVariants
              data={variantCategories}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <MyTextField
              type="text"
              id="unitPrice"
              name="unitPrice"
              title="Số tiền"
              placeholder="Nhập số tiền bán cho phân loại này"
              isRequired
              hasInputNumber
              endIcon={
                <FormatEndCurrencyIcon value={formik.values.unitPrice} />
              }
              minNumber={1}
              className="w-full"
              value={formik.values.unitPrice}
              onChange={formik.handleChange}
              isError={
                getIn(formik.touched, "unitPrice") &&
                Boolean(getIn(formik.errors, "unitPrice"))
              }
              helperText={
                getIn(formik.touched, "unitPrice") &&
                getIn(formik.errors, "unitPrice")
              }
            />
            <MyTextField
              type="text"
              id="inventoryNumber"
              name="inventoryNumber"
              title="Tồn kho"
              placeholder="Nhập số lượng tồn kho cho phân loại này"
              isRequired
              hasInputNumber
              minNumber={1}
              className="w-full"
              value={formik.values.inventoryNumber}
              onChange={formik.handleChange}
              isError={
                getIn(formik.touched, "inventoryNumber") &&
                Boolean(getIn(formik.errors, "inventoryNumber"))
              }
              helperText={
                getIn(formik.touched, "inventoryNumber") &&
                getIn(formik.errors, "inventoryNumber")
              }
            />
            <div className="flex flex-row items-center justify-center py-4">
              <MainInputImage
                id="image"
                name="image"
                rounded="rounded-xl"
                previewImage={previewImage}
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
            </div>
            <div className="flex flex-row items-center justify-center">
              <Button className="!min-w-[250px]" type="submit">
                Thêm
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BuildClassificationsModal;
