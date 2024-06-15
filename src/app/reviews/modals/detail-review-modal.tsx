import ShowingRating from "@/components/reviews/showing-rate";
import { FontSize, TextColor } from "@/enum/setting";
import Button from "@/libs/button";
import MyDefaultText from "@/libs/default-text";
import MyLabel from "@/libs/label";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyTextArea from "@/libs/text-area";
import Typography from "@/libs/typography";
import { useState } from "react";

const DetailReviewModal = () => {
  const [hasDefaultValue, setHasDefaultValue] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start gap-1 text-sm font-bold">
          <div>
            <span className="font-normal">Tên khách hàng:</span> Anh Leonard
          </div>
          <div>
            <span className="font-normal">Ngày đánh giá:</span> 17:28 29/03/2024
          </div>
          <div>
            <span className="font-normal">Mã đơn hàng:</span> QT123456789
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <MyLabel type="warning">Chưa phản hồi</MyLabel>
          <Button
            type="button"
            className="!w-fit !py-2 md:!text-xs"
            color="error"
          >
            Báo cáo bình luận
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <MyPrimaryTextField
          id="productName"
          title="Tên sản phẩm"
          defaultValue={"Hoa loa kèn"}
          disabled
        />
        <div className="flex flex-row items-center gap-8">
          <MyPrimaryTextField
            id="productCode"
            title="Mã sản phẩm"
            defaultValue={"QT123456789"}
            disabled
            className="w-1/2"
          />
          <MyPrimaryTextField
            id="productNumbers"
            title="Số lượng mua"
            defaultValue={"12"}
            disabled
            className="w-1/2"
          />
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="w-1/2">
            <ShowingRating title="Chất lượng sản phẩm" defaultValue={4} />
            <ShowingRating title="Chất lượng sản phẩm" defaultValue={4} />
            <ShowingRating title="Chất lượng sản phẩm" defaultValue={4} />
          </div>
          <div className="flex h-[110px] w-1/2 flex-col items-center justify-center gap-1 rounded-2xl border-[2px] border-primary-c200 bg-primary-c50">
            <div className="text-sm font-semibold">Trung bình</div>
            <div className="text-2xl font-bold text-primary-c900">3.5/5.0</div>
          </div>
        </div>
        <MyDefaultText title="Bình luận của khách">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          et eros ante. In consectetur lorem lectus, eget tincidunt ante
          accumsan nec. Nullam tristique metus quis pulvinar cursus. Praesent
          vulputate pretium felis, ut porta libero. Vivamus vulputate lectus id
          velit interdum, eu luctus nibh maximus.
        </MyDefaultText>
        {!showEdit && (
          <MyDefaultText title="Phản hồi của bạn">
            Thanks for your buying!
          </MyDefaultText>
        )}
        {showEdit && (
          <MyTextArea
            id="replyReview"
            title="Phản hồi"
            placeholder="Nhập phản hồi của bạn"
            defaultValue={"Thanks for your buying!"}
          />
        )}
      </div>
      <div className="mt-2 flex flex-row items-center gap-8">
        <Button
          className="!mx-auto !w-[180px]"
          color="black"
          onClick={() => setShowEdit(true)}
          disabled={showEdit}
        >
          Chỉnh sửa
        </Button>
        <Button
          className="!mx-auto !w-[180px]"
          disabled={!showEdit}
          onClick={() => setShowEdit(false)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default DetailReviewModal;
