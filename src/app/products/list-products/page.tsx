"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import ListProductsScreen from "@/screens/products/list-products-screen";

const MainListProducts = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen />
    </DefaultLayout>
  );
};

export default MainListProducts;
