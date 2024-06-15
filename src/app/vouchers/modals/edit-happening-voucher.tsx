import ShowingRating from "@/components/reviews/showing-rate";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import MyPrimaryTextField from "@/libs/primary-text-field";
import React from "react";

const EditHappeningVoucher = () => {
  return (
    <div className="flex flex-col gap-3 py-2">
      <MyLabel type="delivery">Đang diễn ra</MyLabel>
      <ShowingRating
        defaultValue={70}
        min={0}
        max={100}
        className="max-w-[92%]"
        rateLabel="70/100"
        color={COLORS.support.c900}
      />
      <MyDatePicker
        label="Ngày kết thúc"
        placeholder="-- Lựa chọn --"
        defaultDate={"2024/26/04"}
        isRequired
        className="w-full"
        isError
        helperText="Helper text ..."
      />
      <MyPrimaryTextField
        type="number"
        id="numbersOfDiscount"
        title="Số lượt sử dụng voucher"
        placeholder="Nhập số lượt sử dụng voucher"
        defaultValue={"450"}
        minNumber={1}
        isRequired
        isError
        helperText={"Vui lòng nhập số lượng cao hơn số lượng voucher ban đầu"}
      />
      <Button className="mx-auto mt-2 w-[180px] md:w-[200px]">Cập nhật</Button>
    </div>
  );
};

export default EditHappeningVoucher;
