import { ClassifiedClass, Variant } from "@/enum/defined-type";
import React, { useState } from "react";
import MyLabel from "../../libs/label";
import Button from "../../libs/button";
import MyTextField from "../../libs/text-field";
import MyTextAction from "../../libs/text-action";
import MyDisplayImage from "../../libs/display-image";
import MyPrimaryTextField from "../../libs/primary-text-field";
import MyDefaultText from "../../libs/default-text";
import { formatCurrency, formatVariant } from "@/enum/functions";
import { headerUrl } from "@/apis/services/authentication";

type MyDisabledMultipleChoicesProps = {
  variants: Variant[];
  isError?: boolean;
  helperText?: string;
};

const MyDisabledMultipleChoices = ({
  variants,
  isError,
  helperText,
}: MyDisabledMultipleChoicesProps) => {
  return (
    <div className="flex w-full flex-col gap-8 border-b-2 border-t-2 border-grey-c50 pb-8 pt-5">
      {variants.map((variant: Variant, index: number) => {
        const className = formatVariant(variant.variantItems);
        return (
          <div
            key={index}
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
              <div className="flex flex-1 flex-row items-end gap-8 pr-8">
                <MyPrimaryTextField
                  id="price"
                  type="text"
                  minNumber={1}
                  title="Giá tiền"
                  defaultValue={formatCurrency(variant.unitPrice)}
                  disabled
                />
                <MyPrimaryTextField
                  id="inventoryNumber"
                  type="number"
                  minNumber={1}
                  title="Tồn kho"
                  defaultValue={variant.inventoryNumber}
                  disabled
                />
              </div>
              <MyDisplayImage
                src={`${headerUrl}/products/${variant?.image}`}
                alt=""
                width="w-[52px]"
                height="h-[52px]"
              />
            </div>
            {isError && helperText && (
              <MyDefaultText wrapClassName="mt-2" type="error">
                {helperText}
              </MyDefaultText>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyDisabledMultipleChoices;
