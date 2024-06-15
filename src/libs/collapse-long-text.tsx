import React, { ReactNode } from "react";
import MyTextAction from "./text-action";
import { Collapse } from "@mui/material";

type MyCollapseLongTextProps = {
  open: boolean;
  onClick: () => void;
  collapsedSize?: number;
  children?: ReactNode;
};

const MyCollapseLongText = ({
  open,
  onClick,
  collapsedSize = 80,
  children = "",
}: MyCollapseLongTextProps) => {
  return (
    <div>
      <Collapse collapsedSize={collapsedSize} in={open} className="relative">
        <div className="text-justify text-sm text-grey-c900">{children}</div>
        {!open && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </Collapse>
      <MyTextAction
        label={open ? "Thu gọn" : "Mở"}
        className="text-xs"
        onClick={() => onClick()}
      ></MyTextAction>
    </div>
  );
};

export default MyCollapseLongText;
