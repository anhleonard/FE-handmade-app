import { OrderCount } from "@/enum/defined-type";
import useChart from "@/hooks/use-chart";
import React from "react";
import ReactApexChart from "react-apexcharts";

type Props = {
  data?: OrderCount;
  totalOrders?: number;
};

const BarChat = ({ data, totalOrders }: Props) => {
  const series = data
    ? [
        data?.WAITING_PAYMENT,
        data?.PROCESSING,
        data?.DELIVERED,
        data?.SHIPPED,
        data?.CENCELLED,
        data?.OVERDATE,
      ]
    : [];

  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: "60%" },
    },
    xaxis: {
      categories: [
        "Chờ duyệt",
        "Đang xử lý",
        "Đang vận chuyển",
        "Đã giao hàng",
        "Đã hủy",
        "Quá hạn",
      ],
      labels: {
        style: {
          colors: ["#000"],
          fontSize: "14px",
          fontWeight: "medium",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#000"],
          fontSize: "14px",
          fontWeight: "medium",
        },
      },
    },
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      <div className="flex items-center justify-between text-sm">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Đơn hàng theo trạng thái
        </h5>
        <div>
          Tổng số:{" "}
          <span className="font-bold text-primary-c900">
            {totalOrders ?? 0}
          </span>{" "}
          đơn hàng
        </div>
      </div>

      {/* có data thì render biểu đồ */}
      {data && totalOrders ? (
        <ReactApexChart
          type="bar"
          series={[{ data: series }]}
          options={chartOptions}
          height={400}
        />
      ) : null}

      {/* giao diện không có data */}
      {!(data && totalOrders) ? (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <img src="/images/no-data.png" alt="no-data" className="h-36 w-36" />
          <div className="text-sm font-medium text-grey-c900">
            Chưa có dữ liệu
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BarChat;
