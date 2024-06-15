import {
  applicableProductTypes,
  discountTypes,
  minOrderTypes,
} from "@/enum/constants";
import { FontFamily, FontSize } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import Image from "next/image";
import { useState } from "react";
import MySingleCheckBox from "@/libs/single-checkbox";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyTextField from "@/libs/text-field";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";

const CreateVoucherScreen = () => {
  const [discountType, setDiscountType] = useState(discountTypes[0].value);
  const [minOrderType, setMinOrderType] = useState(minOrderTypes[0].value);
  const [productType, setProductType] = useState(
    applicableProductTypes[0].value,
  );

  const [isCheckedItem, setIsCheckedItem] = useState(false);

  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
      <div className="mb-4 flex flex-col gap-3">
        <div className="border-b-2 border-dashed border-grey-c50 pb-2 text-lg font-bold text-grey-c900">
          Tạo voucher mới
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">1. Thông tin chung</div>
          <div className="flex flex-row items-center gap-8">
            <MyPrimaryTextField
              id="voucherName"
              title="Tên voucher"
              placeholder="Nhập tên voucher"
              isRequired
            />
            <MyPrimaryTextField
              id="voucherCode"
              title="Mã voucher"
              placeholder="Nhập mã voucher"
              isRequired
            />
          </div>
          <div className="flex flex-row items-center gap-8">
            <MyDatePicker
              label="Ngày bắt đầu"
              placeholder="-- Lựa chọn --"
              isRequired
              className="w-full"
            />
            <MyDatePicker
              label="Ngày kết thúc"
              placeholder="-- Lựa chọn --"
              isRequired
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">2. Điều kiện áp dụng</div>
          <div className="flex flex-col gap-4">
            <MyRadioButtonsGroup
              label="Loại giảm giá"
              isRequired
              options={discountTypes}
              defaultValue={discountTypes[0].value}
              onChanged={(value) => {
                if (value === "MONEY") setDiscountType(discountTypes[0].value);
                else if (value === "PERCENTAGE")
                  setDiscountType(discountTypes[1].value);
              }}
            />
            {discountType == discountTypes[0].value && (
              <MyTextField
                id="moneyDiscount"
                type="text"
                title="Lượng tiền giảm"
                placeholder="Nhập số lượng tiền giảm (Min: 5.000 - Max: 30.000.000)"
                isRequired
                hasInputNumber
                defaultValue={50000}
                endIcon={<FormatEndCurrencyIcon value={50000} />}
              />
            )}
            {discountType == discountTypes[1].value && (
              <div className="flex flex-col gap-4">
                <MyTextField
                  type="number"
                  id="percentageDiscount"
                  title="Phần trăm giảm"
                  placeholder="Nhập số lượng % giảm (Min: 2% - Max: 99%)"
                  minNumber={2}
                  maxNumber={99}
                  isRequired
                  defaultValue={12}
                  endIcon={
                    <span className="pl-2 text-xs font-bold text-primary-c900">
                      12%
                    </span>
                  }
                />
                <MyTextField
                  type="text"
                  id="percentageDiscount"
                  title="Số tiền giảm tối đa"
                  placeholder="Nhập số tiền giảm tối đa"
                  isRequired
                  hasInputNumber
                  defaultValue={50000}
                  endIcon={<FormatEndCurrencyIcon value={50000} />}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <MyRadioButtonsGroup
              label="Giá trị đơn hàng tối thiểu"
              isRequired
              options={minOrderTypes}
              defaultValue={minOrderTypes[0].value}
              onChanged={(value) => {
                if (value === "UNLIMITED_VALUE")
                  setMinOrderType(minOrderTypes[0].value);
                else if (value === "CUSTOM_VALUE")
                  setMinOrderType(minOrderTypes[1].value);
              }}
            />
            {minOrderType == minOrderTypes[1].value && (
              <MyPrimaryTextField
                type="number"
                id="minOrderValue"
                title="Giá trị đơn hàng tối thiểu"
                placeholder="Nhập giá trị đơn hàng tối thiểu"
                minNumber={1}
                isRequired
              />
            )}
          </div>
          <MyPrimaryTextField
            type="number"
            id="numbersOfDiscount"
            title="Số lượt sử dụng voucher"
            placeholder="Nhập số lượt sử dụng voucher"
            minNumber={1}
            isRequired
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">3. Sản phẩm áp dụng</div>
          <div className="flex flex-row items-center justify-between">
            <MyRadioButtonsGroup
              options={applicableProductTypes}
              defaultValue={applicableProductTypes[0].value}
              onChanged={(value) => {
                if (value === "ALL_ITEMS")
                  setProductType(applicableProductTypes[0].value);
                else if (value === "CUSTOM_ITEMS")
                  setProductType(applicableProductTypes[1].value);
              }}
            />
            {productType === applicableProductTypes[1].value && (
              <div className="pr-1 text-base">
                Đã chọn:{" "}
                <span className="font-bold text-primary-c900">10 </span>
                sản phẩm
              </div>
            )}
          </div>
          {/* table */}
          {productType === applicableProductTypes[1].value && (
            <div className="max-w-[100%] overflow-hidden rounded-[10px]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] table-auto text-left text-sm">
                  <thead
                    className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
                  >
                    <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                      <th className="py-4 pl-3">Tên sản phẩm</th>
                      <th className="px-1 py-4">Tồn kho</th>
                      <th className="px-1 py-4">Giá hiện tại</th>
                      <th className="px-1 py-4">Giá sau giảm</th>
                      <th className="px-1 py-4 text-center">Lựa chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* item 1 */}
                    <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                      <td className="py-4 pl-3">
                        <div className="flex flex-row items-start gap-2">
                          <Image
                            alt="Laptop"
                            width={60}
                            height={60}
                            className="rounded-lg"
                            src={
                              "https://salt.tikicdn.com/cache/350x350/ts/product/34/ea/17/24907f37b8c0896ef083d630284663df.png.webp"
                            }
                          />
                          <div className="flex flex-col justify-start">
                            <div className="max-w-[160px] overflow-ellipsis break-words md:max-w-[180px]">
                              Thiết bị tivi giải trí xách tay LG StanbyME Go 27
                              inchs
                            </div>
                            <div className="mt-1 text-xs font-semibold text-primary-c900">
                              MILLJDJSJ1235
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-1 py-4">300</td>
                      <td className="px-1 py-4">250000</td>
                      <td className="px-1 py-4">210.000</td>
                      <td className="px-1 py-4 text-center">
                        <MySingleCheckBox
                          isChecked={isCheckedItem}
                          onChanged={() => setIsCheckedItem(!isCheckedItem)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateVoucherScreen;
