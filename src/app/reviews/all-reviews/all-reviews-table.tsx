import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { Rating, Tooltip } from "@mui/material";
import { COLORS } from "@/enum/colors";
import Image from "next/image";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MyLabel from "@/libs/label";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import DetailReviewModal from "../modals/detail-review-modal";
import { openConfirm } from "@/redux/slices/confirmSlice";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
];

const timeOptions = [
  { label: "Hôm nay", value: "TODAY" },
  { label: "7 ngày trước", value: "7_DAYS_AGO" },
  { label: "15 ngày trước", value: "15_DAYS_AGO" },
  { label: "30 ngày trước", value: "30_DAYS_AGO" },
  { label: "> 30 ngày trước", value: "OVER_30_DAYS_AGO" },
];

const AllReviewsTable = () => {
  const dispatch = useDispatch();

  const handleOpenDetailReviewModal = () => {
    const modal = {
      isOpen: true,
      title: "Chi tiết đánh giá",
      content: <DetailReviewModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleReportReview = () => {
    const confirm: any = {
      isOpen: true,
      title: "BÁO CÁO BÌNH LUẬN",
      message: "Bạn có chắc chắn báo cáo bình luận này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => {},
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        {/* filter */}
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-row items-center gap-1">
            <MySelect options={labelOptions} selected={labelOptions[0].value} />
            <MyTextField
              id="searchItem"
              endIcon={<SearchIcon />}
              placeholder="Nhập nội dung tìm kiếm"
              className="w-[300px]"
            />
          </div>
          <MySelect options={timeOptions} selected={timeOptions[0].value} />
        </div>
        {/* table */}
        <div>
          <div className="pb-1 pl-1 text-sm">
            Số đánh giá:{" "}
            <span className="font-bold text-primary-c900">412</span>
          </div>
          <div className="max-w-[100%] overflow-hidden rounded-[10px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-auto text-left text-sm">
                <thead
                  className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
                >
                  <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                    <th className="py-4 pl-3">Mã đơn hàng</th>
                    <th className="px-1 py-4">Tên sản phẩm</th>
                    <th className="px-1 py-4">Thời gian</th>
                    <th className="px-1 py-4">Đánh giá</th>
                    <th className="px-1 py-4">Nội dung</th>
                    <th className="px-1 py-4">Trạng thái</th>
                    <th className="px-1 py-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                    <td className="py-4 pl-3">38BEE27</td>

                    <td className="px-1 py-4">
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
                    <td className="px-1 py-4">15:36:59 28/03/2024</td>
                    <td className="px-1 py-4">
                      <Rating
                        name="read-only-rating"
                        defaultValue={3}
                        size="small"
                        readOnly
                      />
                      <div>
                        Trung bình :{" "}
                        <span className="font-semibold text-primary-c900">
                          3/5
                        </span>{" "}
                        sao
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      <div
                        className="max-w-[160px] overflow-hidden overflow-ellipsis md:max-w-[180px]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        Mn nên ủng hộ shop nhé giao hàng đẹp nhanh ship thân
                        thiện quen r nên bảo ra ngõ lấy sau ủng hộ shop tiếp ak
                      </div>
                    </td>
                    <td className="py-4 pl-3">
                      <MyLabel type="success">Đã phản hồi</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Phản hồi">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailReviewModal()}
                          >
                            <ReplyRoundedIcon
                              sx={{ fontSize: 22, color: COLORS.blue.c900 }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Báo cáo bình luận">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleReportReview()}
                          >
                            <FlagOutlinedIcon
                              sx={{ fontSize: 20, color: COLORS.support.c500 }}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviewsTable;
