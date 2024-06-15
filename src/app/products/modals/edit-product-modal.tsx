import {
  singleProduct,
  updateProductBySeller,
  updateProductVariants,
} from "@/apis/services/product";
import { AlertStatus, ProductStatus } from "@/enum/constants";
import { AlertState, Product, Variant } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyPrimaryTextField from "@/libs/primary-text-field";
import SwitchButton from "@/libs/switch-button";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, getIn } from "formik";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import UpdateClassifications from "@/components/products/update-classifications";
import { Chip } from "@mui/material";
import { formatVariant } from "@/enum/functions";
import { closeModal, openModal } from "@/redux/slices/modalSlice";
import { SCREEN } from "@/enum/setting";
import storage from "@/apis/storage";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { openSecondModal } from "@/redux/slices/secondModalSlice";

type Props = {
  productId: number;
};

const EditProductModal = ({ productId }: Props) => {
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [product, setProduct] = useState<Product>();

  const initialValues = useMemo(() => {
    return {
      productName: product?.productName ?? "",
      price: product?.price ?? 0,
      inventoryNumber: product?.inventoryNumber ?? 0,
    };
  }, [product]);

  const getSingleProduct = async () => {
    try {
      dispatch(openLoading());
      const res: Product = await singleProduct(productId);
      if (res?.status === ProductStatus.OFF) {
        setIsChecked(false);
      }
      setProduct(res);
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
    getSingleProduct();
  }, [refetchQueries]);

  const onSubmit = async (values: any) => {
    try {
      dispatch(openLoading());
      let variables = {};
      if (!product?.isMultipleClasses) {
        variables = {
          status: isChecked ? ProductStatus.SELLING : ProductStatus.OFF,
          productName: values?.productName,
          inventoryNumber: values?.inventoryNumber,
          price: parseInt(values?.price),
        };
      } else {
        variables = {
          status: isChecked ? ProductStatus.SELLING : ProductStatus.OFF,
          productName: values?.productName,
        };
      }

      const token = storage.getLocalAccessToken();
      const res = await updateProductBySeller(productId, variables, token);
      if (res) {
        if (product?.isMultipleClasses) {
          //update product sau khi update variant
          await updateProductVariants(product?.id, token);
        }

        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Cập nhật thông tin sản phẩm thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        dispatch(refetchComponent());
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

  const handleOpenEditVariantModal = (content: ReactNode) => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa phân loại",
      content: content,
      screen: SCREEN.BASE,
    };
    dispatch(openSecondModal(modal));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-3">
            <div
              className={`flex flex-row justify-between gap-4 md:gap-0 ${formik?.errors.productName ? "items-start" : "items-center"}`}
            >
              <MyPrimaryTextField
                id="productName"
                name="productName"
                title="Tên sản phẩm"
                className="w-full md:!w-[88%]"
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

              <SwitchButton
                checked={isChecked}
                title="Bật/ Tắt"
                handleClickSwitchButton={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </div>
            {product?.isMultipleClasses ? (
              <div className="flex flex-row items-center gap-4">
                {product?.variants?.map((variant: Variant, index: number) => {
                  return (
                    <div key={index}>
                      <Chip
                        label={formatVariant(variant?.variantItems)}
                        onClick={() => {
                          const content = (
                            <UpdateClassifications
                              variant={variant}
                              onSubmitCallback={(res: any) => {
                                dispatch(refetchComponent());
                              }}
                            />
                          );
                          handleOpenEditVariantModal(content);
                        }}
                        onDelete={() => {}}
                        color="warning"
                      ></Chip>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mb-4 flex flex-row items-start justify-between gap-8">
                <MyTextField
                  id="inventoryNumber"
                  name="inventoryNumber"
                  type="number"
                  title="Tồn kho"
                  placeholder="Nhập số lượng tồn kho"
                  className="w-1/2"
                  isRequired={false}
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
                <MyTextField
                  id="price"
                  name="price"
                  title="Giá bán"
                  placeholder="Nhập giá bán 1 sản phẩm"
                  defaultValue={240000}
                  className="w-1/2"
                  hasInputNumber
                  isRequired={false}
                  endIcon={
                    <FormatEndCurrencyIcon value={formik.values.price} />
                  }
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
              </div>
            )}
            <div className="mx-auto w-fit py-3">
              <Button className="!w-[200px]" type="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProductModal;
