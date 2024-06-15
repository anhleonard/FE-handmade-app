import React, { useMemo } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { BgColor, TextColor } from "@/enum/setting";
import Button from "./button";
import { Tooltip } from "@mui/material";
import { Page, optionRowsPerPage } from "@/enum/constants";
import { COLORS } from "@/enum/colors";

type Props = {
  page: number;
  handlePageChange: Function;
  rowsPerPage: number;
  total: number;
  handleRowPerPageChange: Function;
};

export const MyPagination = ({
  page,
  handlePageChange,
  rowsPerPage,
  total,
  handleRowPerPageChange,
}: Props) => {
  const totalPages = useMemo(
    () => Math.ceil(total / rowsPerPage),
    [total, rowsPerPage],
  );

  const optionRowPerPageList = optionRowsPerPage.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <div className="flex items-center justify-between border-t border-grey-c100 px-4 py-3 sm:px-6">
      <div className="flex  w-full items-center justify-between">
        {/* Giao diện cho màn xs */}
        <div className="flex w-full justify-between sm:hidden">
          <Button
            className={`w-[82px] 
         ${
           page === Page
             ? `
             ${BgColor.GREY_100}
             ${TextColor.WHITE}`
             : `
             hover:scale-105 focus:scale-105 
             `
         }`}
            color="info"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === Page}
          >
            Previous
          </Button>
          <Button
            className={`w-[82px]
         ${
           page === totalPages
             ? `
             ${BgColor.GREY_100}
             ${TextColor.WHITE}
         `
             : `hover:scale-105 focus:scale-105`
         }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
        {/* Giao diện cho màn sm trở lên */}
        <div className="flex-row items-center justify-center gap-2 xs:hidden md:flex">
          <div>Rows per page:</div>
          <select
            className=" rounded-md border border-primary-c800 active:border-grey-c400"
            value={rowsPerPage}
            onChange={(e) => {
              handleRowPerPageChange(e);
            }}
          >
            {optionRowPerPageList}
          </select>
        </div>
        {/* Pagination links */}
        <nav
          className=" isolate inline-flex items-center gap-8 -space-x-px rounded-md xs:hidden sm:flex"
          aria-label="Pagination"
        >
          <div className="isolate inline-flex items-center gap-4 rounded-md shadow-sm">
            {/* Previous button */}
            <Tooltip title="Previous">
              <span>
                <button
                  disabled={page === Page}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    color="inherit"
                    fontSize="small"
                    style={{
                      color:
                        page === Page ? COLORS.grey.c200 : COLORS.grey.c900,
                    }}
                    className={
                      page !== Page ? "rounded-lg hover:bg-grey-c100" : ""
                    }
                  ></ChevronLeftIcon>
                </button>
              </span>
            </Tooltip>
            <div className="xs:hidden sm:block">
              Showing
              <span className="font-bold text-primary-c700">
                {" "}
                {total !== 0 && page}{" "}
              </span>
              to
              <span className="font-bold text-primary-c700">
                {" "}
                {` ${total % rowsPerPage === 0 ? Math.floor(total / rowsPerPage) : Math.floor(total / rowsPerPage) + 1} `}
              </span>
              of <span className="font-bold text-primary-c700"> {total} </span>{" "}
              results
            </div>
            {/* Next button */}
            <Tooltip title="Next">
              <span>
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <span className="sr-only">Next</span>
                  <NavigateNextIcon
                    color="inherit"
                    fontSize="small"
                    style={{
                      color:
                        page === totalPages
                          ? COLORS.grey.c200
                          : COLORS.grey.c900,
                    }}
                    className={
                      page !== totalPages ? "rounded-lg hover:bg-grey-c100" : ""
                    }
                  ></NavigateNextIcon>
                </button>
              </span>
            </Tooltip>
          </div>
        </nav>
      </div>
    </div>
  );
};
