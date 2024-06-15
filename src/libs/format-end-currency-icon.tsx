import { formatCurrency } from "@/enum/functions";
import React from "react";

type FormatEndCurrencyIconProps = {
  value: number;
};

const FormatEndCurrencyIcon = ({ value }: FormatEndCurrencyIconProps) => {
  return (
    <span className="pl-2 text-xs font-bold text-primary-c900">
      {formatCurrency(value)}
    </span>
  );
};

export default FormatEndCurrencyIcon;
