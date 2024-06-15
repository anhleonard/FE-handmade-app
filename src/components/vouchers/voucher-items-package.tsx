import MyDisplayImage from "@/libs/display-image";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";

const VoucherItemsPackage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border-[2px] border-primary-c300">
      <ListItem
        className={`${!open ? "rounded-2xl" : "rounded-tl-2xl rounded-tr-2xl"} bg-primary-c50`}
        disablePadding
      >
        <ListItemButton
          onClick={() => setOpen(!open)}
          className="flex flex-row justify-between px-4 py-3 hover:bg-transparent"
        >
          <div className="flex flex-row items-center gap-2">
            <ShoppingBagRoundedIcon
              sx={{ fontSize: 20, color: COLORS.primary.c900 }}
            />
            <div className="text-sm font-semibold text-primary-c900">
              Đơn hàng (2)
            </div>
          </div>
          {!open ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          <ListItem className="block w-full" disablePadding>
            <div className="flex flex-row items-start gap-4">
              <MyDisplayImage
                src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
                alt=""
                width="w-[60px]"
                height="h-[60px]"
              />
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="text-base font-medium text-grey-c900">
                  Thiết bị tivi giải trí xách tay LG StanbyME Go 27 inchs
                </div>
                <div className="text-xs font-medium text-grey-c900">
                  Mã sản phẩm:{" "}
                  <span className="text-primary-c900">241125K2</span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-xs font-medium text-grey-c900">
                    Tồn kho: 300
                  </div>
                  <div className="text-xs font-medium text-grey-c900">
                    Giá hiện tại: {formatCurrency(250000)}
                  </div>
                  <div className="text-xs font-medium text-grey-c900">
                    Giá sau giảm: {formatCurrency(200000)}
                  </div>
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem className="block w-full" disablePadding>
            <div className="flex flex-row items-start gap-4">
              <MyDisplayImage
                src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
                alt=""
                width="w-[60px]"
                height="h-[60px]"
              />
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="text-base font-medium text-grey-c900">
                  Thiết bị tivi giải trí xách tay LG StanbyME Go 27 inchs
                </div>
                <div className="text-xs font-medium text-grey-c900">
                  Mã sản phẩm:{" "}
                  <span className="text-primary-c900">241125K2</span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-xs font-medium text-grey-c900">
                    Tồn kho: 300
                  </div>
                  <div className="text-xs font-medium text-grey-c900">
                    Giá hiện tại: {formatCurrency(250000)}
                  </div>
                  <div className="text-xs font-medium text-grey-c900">
                    Giá sau giảm: {formatCurrency(200000)}
                  </div>
                </div>
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default VoucherItemsPackage;
