import { headerUrl } from "@/apis/services/authentication";
import { UpdateVariant, Variant } from "@/enum/defined-type";
import { formatVariant } from "@/enum/functions";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyLabel from "@/libs/label";
import MainInputImage from "@/libs/main-input-image";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyTextField from "@/libs/text-field";
import React, { useEffect, useState } from "react";

type Props = {
  index: number;
  variant: Variant;
  variants: Variant[];
  handleUpdateVariants: (item: UpdateVariant) => void;
};

const SingleChoiceVariant = ({
  index,
  variant,
  variants,
  handleUpdateVariants,
}: Props) => {
  const [fixedVariant, setFixedVariant] = useState<UpdateVariant>();

  const [price, setPrice] = useState<number>(variant?.unitPrice);
  const [stock, setStock] = useState<number>(variant?.inventoryNumber);

  const [fileImage, setFileImage] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState(
    `${headerUrl}/products/${variant?.image}`,
  );

  const className = formatVariant(variant.variantItems);

  const handleChangeVariant = () => {
    setFixedVariant({
      id: variant?.id,
      inventoryNumber: stock,
      unitPrice: price,
      ...(fileImage
        ? {
            fileImage: fileImage,
          }
        : {
            image: variant?.image,
          }),
    });
  };

  useEffect(() => {
    handleChangeVariant();
  }, [price, stock, fileImage]);

  useEffect(() => {
    if (fixedVariant) {
      handleUpdateVariants(fixedVariant);
    }
  }, [fixedVariant]);

  return (
    <div
      className={`flex flex-col gap-4 ${variants.length - 1 != index && "border-b-2 border-dashed border-grey-c100 pb-8"}`}
    >
      <MyLabel children={`Phân loại ${index + 1}`} type="warning" />
      <MyPrimaryTextField
        id={`${variant.id}`}
        title="Tên phân loại"
        defaultValue={className}
        disabled
      />
      <div className="flex flex-row items-end">
        <div className="flex h-[52px] w-[60px] flex-col items-center justify-center">
          <div>{1 + "/"}</div>
        </div>
        <div className="flex flex-1 flex-row items-end gap-4 pr-4">
          <MyTextField
            type="text"
            id="price"
            name="price"
            title="Giá tiền"
            placeholder="Giá tiền bán của 1 sản phẩm"
            isRequired
            hasInputNumber
            endIcon={<FormatEndCurrencyIcon value={price} />}
            defaultValue={price}
            onChange={(event) => {
              setPrice(
                event.target.value !== "" ? parseInt(event.target.value) : 0,
              );
            }}
          />
          <MyPrimaryTextField
            id="inventoryNumber"
            type="number"
            minNumber={1}
            title="Tồn kho"
            defaultValue={stock}
            onChange={(event) => {
              setStock(
                event.target.value !== "" ? parseInt(event.target.value) : 0,
              );
            }}
          />
        </div>
        <MainInputImage
          id={`single-image-${variant?.id}`}
          name={`single-image-${variant?.id}`}
          previewImage={previewImage}
          width="!w-[52px]"
          height="!h-[52px]"
          rounded="!rounded-lg"
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
    </div>
  );
};

export default SingleChoiceVariant;
