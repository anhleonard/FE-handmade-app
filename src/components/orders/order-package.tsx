import MyDisplayImage from "@/libs/display-image";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { COLORS } from "@/enum/colors";
import { OrderProduct } from "@/enum/defined-type";
import { headerUrl } from "@/apis/services/authentication";
import { formatCurrency } from "@/enum/functions";

type Props = {
  orderProducts: OrderProduct[];
};

const OrderPackage = ({ orderProducts }: Props) => {
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
              Đơn hàng ({orderProducts?.length})
            </div>
          </div>
          {!open ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          {orderProducts?.map((orderProduct, index) => {
            return (
              <ListItem className="block w-full" disablePadding key={index}>
                <div className="flex flex-row items-start gap-4">
                  <img
                    src={`${headerUrl}/products/${
                      orderProduct?.variant
                        ? orderProduct?.variant?.image
                        : orderProduct?.product?.images[0]
                    }`}
                    alt="product-image"
                    className="block h-15 w-15 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-1">
                    <div className="text-base font-semibold text-grey-c900">
                      {orderProduct?.product?.productName}
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="text-xs font-medium text-grey-c900">
                        Số lượng: {orderProduct?.productQuantity}
                      </div>
                      <div className="text-xs font-medium text-grey-c900">
                        Tổng tiền:{" "}
                        <span className="text-sm font-bold text-primary-c900">
                          {orderProduct?.productUnitPrice &&
                            formatCurrency(
                              orderProduct?.productQuantity *
                                parseInt(orderProduct?.productUnitPrice),
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
};

export default OrderPackage;
