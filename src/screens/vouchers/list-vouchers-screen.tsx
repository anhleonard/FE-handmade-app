"use client";
import Button from "@/libs/button";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FinancialParamCard from "@/components/vouchers/financial-parameters-card";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { productTabs, voucherTabs, yesNoOptions } from "@/enum/constants";
import { COLORS } from "@/enum/colors";
import MyRadioButtonsGroup from "@/libs/radio-button-group";

const ListVouchersScreen = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3">
        <div className="text-lg font-bold text-grey-c900">
          Vouchers của shop
        </div>
        <Button
          startIcon={<AddIcon sx={{ fontSize: 20 }} />}
          className="!px-3 !text-sm"
        >
          Tạo voucher
        </Button>
      </div>
      {/* Các chỉ số hiệu quả chính */}
      <div className="w-full rounded-lg bg-white px-4 py-4 text-sm">
        <div className="mb-4 flex flex-row items-end gap-2">
          <div className="font-semibold">Các chỉ số hiệu quả chính</div>
          <div className="text-xs">7 ngày qua: 26/03/2024 - 02/04/2024</div>
        </div>
        <div className="grid grid-cols-4">
          <div className="border-r-2 border-grey-c50 px-4">
            <FinancialParamCard
              className="col-span-1"
              title="Doanh thu"
              amountMoney="20.000.000"
              status="decrease"
              compare="93.2"
              explaination="Thông tin doanh thu"
            />
          </div>
          <div className="border-r-2 border-grey-c50 px-4">
            <FinancialParamCard
              className="col-span-1"
              title="Đơn hàng"
              amountMoney="1234"
              status="decrease"
              compare="93.2"
              explaination="Thông tin đơn hàng"
            />
          </div>
          <div className="border-r-2 border-grey-c50 px-4">
            <FinancialParamCard
              className="col-span-1"
              title="Tỉ lệ sử dụng"
              amountMoney="87%"
              status="decrease"
              compare="93.2"
              explaination="Thông tin tỉ lệ sử dụng"
            />
          </div>
          <div className="px-4">
            <FinancialParamCard
              className="col-span-1"
              title="Lượt mua"
              amountMoney="522"
              status="increase"
              compare="112.15"
              explaination="Thông tin lượt mua"
            />
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white px-4 py-3 text-sm">
        <div className="text-lg font-bold text-grey-c900">
          Danh sách vouchers
        </div>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="product-screen-tabs"
                  sx={{}}
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: COLORS.primary.c900,
                      height: 2,
                    },
                  }}
                >
                  {voucherTabs.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        label={item.label}
                        value={item.value}
                        sx={{
                          color: COLORS.grey.c900,
                          textTransform: "none",
                          fontSize: "14px",
                          "&.Mui-selected": {
                            color: COLORS.primary.c900,
                            borderBottomColor: "green",
                          },
                        }}
                      />
                    );
                  })}
                </TabList>
              </Box>
              {voucherTabs.map((item, index) => {
                return (
                  <TabPanel key={index} value={item.value}>
                    <div className="my-8">{item.content}</div>
                  </TabPanel>
                );
              })}
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ListVouchersScreen;
