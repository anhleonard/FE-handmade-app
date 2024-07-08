import moment from "moment";
import { Bidder, Progress, Shipping, VariantItem } from "./defined-type";
import { Role } from "./constants";
import storage from "@/apis/storage";

export function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  const parts = formatter.formatToParts(price);

  let formattedPrice = "";
  parts.forEach((part) => {
    if (part.type !== "currency") {
      formattedPrice += part.value;
    }
  });

  return formattedPrice + "đ";
}

export function sellerFormatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  const parts = formatter.formatToParts(price);

  let formattedPrice = "";
  parts.forEach((part) => {
    if (part.type !== "currency") {
      formattedPrice += part.value;
    }
  });

  return formattedPrice;
}

export function formatVariant(data: Array<VariantItem>) {
  const names = data.map((variantItem: VariantItem) => variantItem?.name);
  const result = names.join(" - ");
  return result;
}

export function formatDate(timestamp: Date) {
  const date = moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
  return date;
}

export function formatCommonTime(time: Date, addDays?: number) {
  const date = new Date(time);
  if (addDays) {
    date.setDate(date.getDate() + 7);
  }
  // Lấy giờ và phút
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  // Lấy ngày, tháng, và năm
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  let year = date.getFullYear();

  // Định dạng thành chuỗi
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export function formatShippingAddress(data: Shipping) {
  if (data?.companyName)
    return `${data?.companyName}, ${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
  return `${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
}

export function renderWhoCanceled(role: Role) {
  switch (role) {
    case Role.USER:
      return "Khách hàng";
    case Role.SELLER:
      return "Nhà bán";
    case Role.ADMIN:
      return "Quản trị viên";
  }
}

export function calculateRemainingDays(date: Date) {
  const targetDate = new Date(date);

  // Ngày hiện tại
  const currentDate = new Date();

  // Tính số mili giây giữa hai ngày
  const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();

  // Chuyển đổi mili giây thành ngày
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  return differenceInDays;
}

export function hiddenEmail(email: string) {
  const atIndex = email.indexOf("@");
  const hiddenEmail = email.replace(email.substring(1, atIndex), "***");

  return hiddenEmail;
}

export function calculateAverageBidderMoney(candidates: Bidder[]) {
  const totalBidderMoney = candidates.reduce(
    (total, candidate) => total + candidate.bidderMoney,
    0,
  );

  const averageBidderMoney = totalBidderMoney / candidates.length;

  const roundedAverageBidderMoney = Math.round(averageBidderMoney);

  return roundedAverageBidderMoney;
}

export function findMinMaxBidderMoney(candidates: Bidder[]) {
  if (candidates.length === 0) {
    return []; // Trả về mảng rỗng nếu mảng candidates không có phần tử
  }

  const bidderMoneyArray = candidates.map((candidate) => candidate.bidderMoney);
  const min = Math.min(...bidderMoneyArray);
  const max = Math.max(...bidderMoneyArray);

  return [min, max];
}

export function calculateDaysAfterAccepted(
  estimatedDay: number,
  acceptedAt: Date,
) {
  // Chuyển đổi acceptedAt thành đối tượng Date
  const acceptedDate = new Date(acceptedAt);

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Tính ngày kết thúc
  const endDate = new Date(acceptedDate);
  endDate.setDate(acceptedDate.getDate() + estimatedDay);

  console.log(currentDate, endDate);

  // Tính số ngày còn lại
  const remainingTime = endDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  return remainingDays > 0 ? remainingDays : 0;
}

export function findMaxPercentage(progresses: Progress[]) {
  if (!progresses?.length) return 0;

  const maxPercentage = progresses
    .map((progress) => progress.percentage)
    .filter((percentage) => percentage !== null)
    .reduce((max, current) => Math.max(max, current), 0);

  return maxPercentage;
}

export function getCurrentUser() {
  const localUser = storage.getLocalUser();
  if (localUser) {
    try {
      const user = JSON.parse(localUser);
      return user;
    } catch (error) {
      console.error("Error parsing localUser JSON:", error);
      return null;
    }
  } else {
    console.error("localUser is empty or undefined");
    return null;
  }
}

export function remainingDaysAfterAccepted(
  estimatedDay: number,
  acceptedAt: Date,
) {
  // Chuyển đổi acceptedAt thành đối tượng Date
  const acceptedDate = new Date(acceptedAt);

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Tính ngày kết thúc
  const endDate = new Date(acceptedDate);
  endDate.setDate(acceptedDate.getDate() + estimatedDay);

  // Tính số ngày còn lại
  const remainingTime = endDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  return remainingDays;
}
