import ShowingRating from "@/components/reviews/showing-rate";
import VoucherItemsPackage from "@/components/vouchers/voucher-items-package";
import { COLORS } from "@/enum/colors";
import { applicableProductTypes } from "@/enum/constants";
import { formatCurrency } from "@/enum/functions";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import React from "react";

type DetailVoucherModalProps = {
  type?: "ALL" | "FINISHED" | "HAPPENING" | "UPCOMING";
};

const DetailVoucherModal = ({ type = "ALL" }: DetailVoucherModalProps) => {
  const renderLabel = (labelType: string) => {
    switch (labelType) {
      case "HAPPENING":
        return <MyLabel type="delivery">Đang diễn ra</MyLabel>;
      case "UPCOMING":
        return <MyLabel type="progress">Sắp diễn ra</MyLabel>;
      case "FINISHED":
        return <MyLabel type="error">Đã kết thúc</MyLabel>;
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {renderLabel(type)}
      {type !== "UPCOMING" && (
        <ShowingRating
          defaultValue={70}
          min={0}
          max={100}
          className="max-w-[92%]"
          rateLabel="70/100"
          color={COLORS.support.c900}
        />
      )}
      {/* Thông tin chung */}
      <div className="flex flex-col gap-4">
        <div className="text-sm font-semibold">1. Thông tin chung</div>
        <div className="flex flex-row items-center gap-8">
          <MyPrimaryTextField
            id="voucherName"
            title="Tên voucher"
            placeholder="Nhập tên voucher"
            defaultValue={"Giảm 15K cho đơn hàng từ 299K"}
            disabled
          />
          <MyPrimaryTextField
            id="voucherCode"
            title="Mã voucher"
            placeholder="Nhập mã voucher"
            defaultValue={"241125K3"}
            disabled
          />
        </div>
        <div className="flex flex-row items-center gap-8">
          <MyDatePicker
            label="Ngày bắt đầu"
            placeholder="-- Lựa chọn --"
            className="w-full"
            defaultDate={"2024/06/24"}
            disabled
          />
          <MyDatePicker
            label="Ngày kết thúc"
            placeholder="-- Lựa chọn --"
            className="w-full"
            defaultDate={"2024/06/24"}
            disabled
          />
        </div>
      </div>

      {/* Điều kiện áp dụng */}
      <div className="flex flex-col gap-4">
        <div className="text-sm font-semibold">2. Điều kiện áp dụng</div>
        <MyPrimaryTextField
          type="text"
          id="moneyDiscount"
          title="Lượng giảm"
          defaultValue={formatCurrency(50000)}
          disabled
        />
        <MyPrimaryTextField
          type="text"
          id="minOrderValue"
          title="Giá trị đơn hàng tối thiểu"
          defaultValue={formatCurrency(250000)}
          disabled
        />
        <MyPrimaryTextField
          type="number"
          id="numbersOfDiscount"
          title="Số lượt sử dụng voucher"
          defaultValue={"100"}
          disabled
        />
      </div>

      {/* Sản phẩm áp dụng */}
      <div className="flex flex-col gap-4">
        <div className="text-sm font-semibold">3. Sản phẩm áp dụng</div>
        <MyRadioButtonsGroup
          options={applicableProductTypes}
          defaultValue={applicableProductTypes[1].value}
          disabled
        />
        <VoucherItemsPackage />
      </div>
    </div>
  );
};

export default DetailVoucherModal;
