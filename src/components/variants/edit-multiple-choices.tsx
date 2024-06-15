import { UpdateVariant, Variant } from "@/enum/defined-type";
import React, { useState } from "react";
import SingleChoiceVariant from "./single-choice-variant";

type Props = {
  variants: Variant[];
  handleUpdateVariants: (item: UpdateVariant) => void;
};

const MyEditMultipleChoices = ({ variants, handleUpdateVariants }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8 border-b-2 border-t-2 border-grey-c50 pb-8 pt-5">
      {variants
        .sort((a, b) => a.id - b.id)
        .map((variant: Variant, index: number) => {
          return (
            <SingleChoiceVariant
              key={variant?.id}
              index={index}
              variant={variant}
              variants={variants}
              handleUpdateVariants={handleUpdateVariants}
            />
          );
        })}
    </div>
  );
};

export default MyEditMultipleChoices;
