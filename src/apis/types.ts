import { AuctionStatus, EnumOrderStatus } from "@/enum/constants";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type OrderStatusValues = {
  status: EnumOrderStatus;
};

export type CancelOrderValues = {
  isCanceled: boolean;
  canceledReason: string;
};

export type CreateBidderValues = {
  auctionId: number;
  bidderMoney: string;
  estimatedDay: string;
  selfIntroduce: string;
};

export type CreateProgressValues = {
  auctionId: number;
  comment: string;
  percentage?: number;
};

export type UpdateProgressValues = {
  comment: string;
};

export type CheckTokenValues = {
  token: string;
};

export type CreateStoreValues = {
  sellerId: number;
  name: string;
  avatar: string;
  address: string;
  description: string;
  mainBusiness: string;
  frontCard: string;
  backCard: string;
};

export type ChangeStoreValues = {
  name?: string;
  avatar?: string;
  description?: string;
  mainBusiness?: string;
  frontCard?: string;
  backCard?: string;
  address?: string;
  notApproveReason?: string | null;
};

export type CreateCollectionValues = {
  name: string;
  collectionProductIds: number[];
};

export type UpdateCollectionValues = {
  name?: string;
  collectionProductIds?: number[];
};

export type UpdateStoreValues = {
  name?: string;
  avatar?: string;
  description?: string;
  mainBusiness?: string;
  address?: string;
};

export type UpdateSellerValues = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
};

export type CancelAuctionValues = {
  status: AuctionStatus;
  additionalComment: string;
};

export type ExtendDaysValues = {
  auctionId?: number;
  days?: string;
  comment?: string;
  isAccepted?: boolean;
};

//refund money
export type CreateRefundPaymentValues = {
  zp_trans_id?: string;
  amount?: number;
};

export type PaidAuctionValues = {
  auctionId: number;
  type: string;
};
