"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import ListVouchersScreen from "@/screens/vouchers/list-vouchers-screen";

const MainListVouchers = () => {
  return (
    <DefaultLayout>
      <ListVouchersScreen />
    </DefaultLayout>
  );
};

export default MainListVouchers;
