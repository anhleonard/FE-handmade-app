import { bestSaleProducts } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";

const colors = ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#247BA0"];

interface BestProduct {
  productId: number;
  productName: string;
  totalQuantity: number;
}

interface ChartThreeState {
  series: number[];
}

function calculatePercentageForProduct(
  products: BestProduct[],
  targetProduct: BestProduct,
): number {
  const totalQuantities = products.map((product) => product.totalQuantity);
  const totalSum = totalQuantities.reduce((sum, quantity) => sum + quantity, 0);
  const targetQuantity = targetProduct.totalQuantity;
  return Math.round((targetQuantity / totalSum) * 100);
}

const PieChart: React.FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<ChartThreeState>({
    series: [],
  });
  const [labels, setLabels] = useState<string[]>([]);
  const [bestProducts, setBestProducts] = useState<BestProduct[]>([]);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [],
    }));
  };
  handleReset;

  const getBestSaleProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res: BestProduct[] = await bestSaleProducts(token);
      if (res) {
        const totalQuantities: number[] = res.map(
          (product) => product.totalQuantity,
        );
        const labels: string[] = res.map((product) => product.productName);
        setState({ series: totalQuantities });
        setLabels(labels);
        setBestProducts(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getBestSaleProducts();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: colors,
    labels: labels?.length ? labels : [],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div className="mb-4 flex w-full flex-row items-center justify-between">
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Mặt hàng nổi bật{" "}
          </h5>
          <div className="text-xs font-normal text-grey-c900">30 ngày qua</div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          {/* có data thì render biểu đồ */}
          {state?.series?.length ? (
            <ReactApexChart
              options={options}
              series={state.series}
              type="donut"
            />
          ) : null}

          {/* giao diện không có data */}
          {!state?.series?.length ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-12">
              <img
                src="/images/no-data.png"
                alt="no-data"
                className="h-36 w-36"
              />
              <div className="text-sm font-medium text-grey-c900">
                Chưa có dữ liệu
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-4">
        {bestProducts?.map((product, index) => {
          return (
            <div className="w-full px-8" key={index}>
              <div className="flex w-full items-start gap-2 text-sm font-medium text-black">
                <div>{index + 1}</div>
                <div className="flex w-full justify-between gap-2 dark:text-white">
                  <div>{product?.productName}</div>
                  <div>
                    {calculatePercentageForProduct(bestProducts, product)}%{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;
