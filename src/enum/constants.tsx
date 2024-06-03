import AllOrdersTable from "@/app/orders/list-orders/all-orders/all-orders-table";
import CancelOrdersTable from "@/app/orders/list-orders/cancel-orders/cancel-orders-table";
import DoneOrdersTable from "@/app/orders/list-orders/done-orders/done-orders-table";
import ProcessingOrdersTable from "@/app/orders/list-orders/processing-orders/processing-orders-table";
import TransportOrdersTable from "@/app/orders/list-orders/transport-orders/transport-orders-table";
import WaitingOrdersTable from "@/app/orders/list-orders/waiting-orders/waiting-orders-table";
import AllItemsTable from "@/app/products/list-products/all-items/all-items-table";
import NoItemsTable from "@/app/products/list-products/no-items/no-items-table";
import OffItemsTable from "@/app/products/list-products/off-items/off-items-table";
import PendingItemsTable from "@/app/products/list-products/pending-items/pending-items-table";
import SellingItemsTable from "@/app/products/list-products/selling-items/selling-items-table";
import ViolateItemsTable from "@/app/products/list-products/violate-items/violate-items-table";
import AllReviewsTable from "@/app/reviews/all-reviews/all-reviews-table";
import FiveStarTable from "@/app/reviews/five-star/five-star-table";
import AllVouchersTable from "@/app/vouchers/list-vouchers/all-vouchers/all-vouchers-table";
import FinishedVouchersTable from "@/app/vouchers/list-vouchers/finished-vouchers/finished-vouchers-table";
import HappenningVouchersTable from "@/app/vouchers/list-vouchers/happening-vouchers/happening-vouchers-table";
import UpcomingVouchersTable from "@/app/vouchers/list-vouchers/upcoming-vouchers/upcoming-vouchers-table";
import StarIcon from "@mui/icons-material/Star";
import { COLORS } from "./colors";
import FourStarTable from "@/app/reviews/four-star/four-star-table";
import ThreeStarTable from "@/app/reviews/three-star/three-star-table";
import TwoStarTable from "@/app/reviews/two-star/two-star-table";
import OneStarTable from "@/app/reviews/one-star/one-star-table";
import AllAuctionsTab from "@/app/auctions/my-auctions/all-auctions/all-auctions-table";
import ProcessingAuctionsTab from "@/app/auctions/my-auctions/processing-auctions/processing-auctions-table";
import FinishedAuctionsTab from "@/app/auctions/my-auctions/finished-auctions/finished-auctions-table";
import CanceledAuctionsTab from "@/app/auctions/my-auctions/canceled-auctions/canceled-auctions-table";
import { FilterTime } from "./defined-type";
import StoreProfile from "@/app/(profile)/store-profile/page";
import EditSellerModal from "@/components/profile/edit-seller-modal";
import SellerProfile from "@/app/(profile)/seller-profile/page";

export const Page = 1;
export const Limit = 5;
export const rowsPerPage = 5;
export const optionRowsPerPage = [5, 25, 50, 100, 200];

export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium",
  grey = "bg-grey-c50 text-grey-c900 text-xs font-medium",
}

export const itemStatuses = [
  {
    label: "Tất cả",
    value: "ALL",
    href: "/",
  },
  {
    label: "Đang bán",
    value: "SELLING",
    href: "/",
  },
  {
    label: "Hết hàng",
    value: "OUT_STOCK",
    href: "/",
  },
  {
    label: "Chờ duyệt",
    value: "PENDING",
    href: "/",
  },
  {
    label: "Vi phạm",
    value: "VIOLATE",
    href: "/",
  },
  {
    label: "Tắt bởi Nhà bán",
    value: "TURN_OFF",
    href: "/",
  },
];

export const mainCategories = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Đồ ăn",
    value: "FOOD",
  },
  {
    label: "Quà tặng",
    value: "GIFT",
  },
];

export const yesNoOptions = [
  { label: "Có", value: "YES", index: 0 },
  { label: "Không", value: "NO", index: 1 },
];

//vouchers
export const discountTypes = [
  { label: "Theo số tiền", value: "MONEY", index: 0 },
  { label: "Theo phần trăm", value: "PERCENTAGE", index: 1 },
];

export const minOrderTypes = [
  { label: "Không giới hạn", value: "UNLIMITED_VALUE", index: 0 },
  { label: "Tùy chỉnh giá", value: "CUSTOM_VALUE", index: 1 },
];

export const applicableProductTypes = [
  { label: "Tất cả sản phẩm", value: "ALL_ITEMS", index: 0 },
  { label: "Tùy chỉnh sản phẩm", value: "CUSTOM_ITEMS", index: 1 },
];

// profile tabs
export const profileTabs = [
  {
    label: "Thông tin cơ bản",
    value: "1",
    content: <StoreProfile />,
  },
  {
    label: "Hồ sơ người bán",
    value: "2",
    content: <SellerProfile />,
  },
];

// product tabs
export const productTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllItemsTable />,
  },
  {
    label: "Đang bán",
    value: "2",
    content: <SellingItemsTable />,
  },
  {
    label: "Hết hàng",
    value: "3",
    content: <NoItemsTable />,
  },
  {
    label: "Chờ duyệt",
    value: "4",
    content: <PendingItemsTable />,
  },
  {
    label: "Vi phạm",
    value: "5",
    content: <ViolateItemsTable />,
  },
  {
    label: "Tắt bởi Nhà bán",
    value: "6",
    content: <OffItemsTable />,
  },
];

// order tabs
export const orderTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllOrdersTable />,
  },
  {
    label: "Chờ xác nhận",
    value: "2",
    content: <WaitingOrdersTable />,
  },
  {
    label: "Đang xử lý",
    value: "3",
    content: <ProcessingOrdersTable />,
  },
  {
    label: "Đang vận chuyển",
    value: "4",
    content: <TransportOrdersTable />,
  },
  {
    label: "Đã giao hàng",
    value: "5",
    content: <DoneOrdersTable />,
  },
  {
    label: "Đã hủy",
    value: "6",
    content: <CancelOrdersTable />,
  },
];

//status of order
export const statusOrders = [
  {
    label: "Tất cả",
    value: "ALL_ORDERS",
  },
  {
    label: "Chờ xác nhận",
    value: "WAITING_ORDERS",
  },
  {
    label: "Đang xử lý",
    value: "PROCESSING_ORDERS",
  },
  {
    label: "Đang vận chuyển",
    value: "TRANSFER_ORDERS",
  },
  {
    label: "Đã giao hàng",
    value: "DONE_ORDERS",
  },
  {
    label: "Đã hủy",
    value: "CANCEL_ORDERS",
  },
];

// vouchers tabs
export const voucherTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllVouchersTable />,
  },
  {
    label: "Đang diễn ra",
    value: "2",
    content: <HappenningVouchersTable />,
  },
  {
    label: "Sắp diễn ra",
    value: "3",
    content: <UpcomingVouchersTable />,
  },
  {
    label: "Đã kết thúc",
    value: "4",
    content: <FinishedVouchersTable />,
  },
];

// review tabs
export const reviewTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllReviewsTable />,
  },
  {
    label: (
      <div className="flex flex-row items-center gap-1">
        <div>5</div>
        <StarIcon sx={{ color: COLORS.yellow.c900, fontSize: 18 }} />
      </div>
    ),
    value: "2",
    content: <FiveStarTable />,
  },
  {
    label: (
      <div className="flex flex-row items-center gap-1">
        <div>4</div>
        <StarIcon sx={{ color: COLORS.yellow.c900, fontSize: 18 }} />
      </div>
    ),
    value: "3",
    content: <FourStarTable />,
  },
  {
    label: (
      <div className="flex flex-row items-center gap-1">
        <div>3</div>
        <StarIcon sx={{ color: COLORS.yellow.c900, fontSize: 18 }} />
      </div>
    ),
    value: "4",
    content: <ThreeStarTable />,
  },
  {
    label: (
      <div className="flex flex-row items-center gap-1">
        <div>2</div>
        <StarIcon sx={{ color: COLORS.yellow.c900, fontSize: 18 }} />
      </div>
    ),
    value: "5",
    content: <TwoStarTable />,
  },
  {
    label: (
      <div className="flex flex-row items-center gap-1">
        <div>1</div>
        <StarIcon sx={{ color: COLORS.yellow.c900, fontSize: 18 }} />
      </div>
    ),
    value: "6",
    content: <OneStarTable />,
  },
];

// my auctions tabs
export const sellerAuctionTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllAuctionsTab />,
  },
  {
    label: "Đang tiến hành",
    value: "2",
    content: <ProcessingAuctionsTab />,
  },
  {
    label: "Đã hoàn thành",
    value: "3",
    content: <FinishedAuctionsTab />,
  },
  {
    label: "Đã hủy",
    value: "4",
    content: <CanceledAuctionsTab />,
  },
];

export enum AlertStatus {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export enum ProductStatus {
  ALL = "ALL",
  NO_ITEM = "NO_ITEM",
  PENDING = "PENDING",
  VIOLATE = "VIOLATE",
  SELLING = "SELLING",
  OFF = "OFF",
}

export enum EnumOrderStatus {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CENCELLED = "CENCELLED",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}

export const DATA_COMPLETED_TIME: FilterTime[] = [
  { name: "< 1 tuần", min: 0, max: 6, id: "LESS_1_WEEK" },
  { name: "1 tuần - 2 tuần", min: 7, max: 14, id: "FROM_1_TO_2_WEEKS" },
  { name: "2 tuần - 4 tuần", min: 14, max: 30, id: "FROM_2_TO_4_WEEKS" },
  { name: "1 tháng - 2 tháng", min: 30, max: 60, id: "FROM_1_TO_2_MONTHS" },
  { name: "> 2 tháng", min: 61, id: "MORE_2_MONTHS" },
];

export enum AuctionStatus {
  AUCTIONING = "AUCTIONING",
  PROGRESS = "PROGRESS",
  DELIVERY = "DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum StoreStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED",
}
