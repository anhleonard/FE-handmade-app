"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import ListOrdersScreen from "@/screens/orders/list-orders-screen";

const MainListOrders = () => {
  return (
    <DefaultLayout>
      <ListOrdersScreen />
    </DefaultLayout>
  );
};

export default MainListOrders;
