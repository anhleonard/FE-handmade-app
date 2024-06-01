import { storeSales } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { COLORS } from "@/enum/colors";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Sale } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";

type SeriesData = {
  x: number;
  y: number;
};

type Series = {
  name: string;
  type: "column" | "line";
  data: SeriesData[];
};

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function generateDateLabels() {
  const labels = [];
  const currentDate = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i); // Lùi lại 1 ngày * i
    labels.unshift(formatDate(date));
  }
  return labels;
}

const timeLabels = generateDateLabels();

const CombineChart = () => {
  const dispatch = useDispatch();
  const [sales, setSales] = useState<Sale[]>([]);
  const [series, setSeries] = useState<Series[]>([]);

  const getStoreSales = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res: Sale[] = await storeSales(token);
      if (res) {
        const series: Series[] = [];
        for (let i = 0; i < 2; i++) {
          // loop 12 lần
          const data: SeriesData[] = [];
          for (let sale of res) {
            const seriesData: SeriesData = {
              x: new Date(sale.orderDate).getTime(),
              y: i === 0 ? sale.totalRevenue : sale.totalOrders,
            };

            data.push(seriesData);
          }

          const seriesItem: Series = {
            name: i === 0 ? "Doanh thu" : "Đơn hàng",
            type: i === 0 ? "column" : "line",
            data: data,
          };

          series.push(seriesItem);
        }

        setSeries(series);
        setSales(res);
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
    getStoreSales();
  }, []);

  const [options] = useState<ApexOptions>({
    chart: {
      height: 500,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 3],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
      },
    },
    legend: {
      fontSize: "12px",
    },
    colors: [`${COLORS.blue.c500}`, `${COLORS.primary.c600}`],
    labels: timeLabels,
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          const date = new Date(val);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          return `${day}/${month}`;
        },
      },
      tickAmount: 11,
    },
    yaxis: [
      {
        title: {
          text: "Doanh thu",
          style: {
            fontSize: "14px",
            fontWeight: "semibold",
            fontFamily: "Arial, sans-serif",
            color: `${COLORS.grey.c900}`,
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Đơn hàng",
          style: {
            fontSize: "14px",
            fontWeight: "semibold",
            fontFamily: "Arial, sans-serif",
            color: `${COLORS.grey.c900}`,
          },
        },
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Hiệu quả kinh doanh{" "}
        </h5>
        <div className="text-sm font-normal text-grey-c900">
          12 ngày qua: {sales[0]?.orderDate} - {sales[11]?.orderDate}
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CombineChart;
