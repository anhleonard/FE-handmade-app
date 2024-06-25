import { COLORS } from "@/enum/colors";
import { ApexOptions } from "apexcharts";
import { mergeDeepRight } from "ramda";

export default function useChart(options: ApexOptions) {
  const LABEL_TOTAL = {
    show: true,
    label: "Tổng số đơn",
    color: COLORS.primary.c900,
    fontSize: "20px",
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: COLORS.grey.c900,
    fontSize: "18px",
  };

  const baseOptions = {
    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "gray",
      fontFamily: "500",
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      colors: [`${COLORS.primary.c800}`],
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: {
      enabled: false,
    },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: "blue",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
    },

    // Tooltip
    tooltip: {
      theme: 'lỉght',
      fillSeriesColor: false,
      x: {
        show: true,
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        return `<div style="background-color: ${COLORS.blue.c900}; color: white; padding: 8px 12px; font-size: 12px;">` +
          '<span>' + w.globals.labels[dataPointIndex] + '</span>: ' +
          series[seriesIndex][dataPointIndex] +
          '</div>';
      }
    },

    // Legend
    legend: {
      show: true,
      fontSize: 12,
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 30,
      },
      labels: {
        colors: "#000",
      },
    },

    // plotOptions
    plotOptions: {
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
        colors: ["#FF4560", "#008FFB"],
      },

      // Bar
      bar: {
        borderRadius: 4,
        columnWidth: '28%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            show: false,
          },
        },
      },
      {
        breakpoint: 900,
        options: {
          legend: {
            show: true,
          },
        },
      },
    ],
  };

  return mergeDeepRight(baseOptions, options) as ApexOptions;
}
