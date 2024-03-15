"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import localFont from "next/font/local";

export const quicksand = localFont({
  src: [
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "100",
      style: "thin", //weight 100
    },
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "200",
      style: "extralight", //weight 200
    },
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "300",
      style: "light", //weight 300
    },
    {
      path: "../assets/fonts/Quicksand-Regular.ttf",
      weight: "400",
      style: "normal", //weight 400
    },
    {
      path: "../assets/fonts/Quicksand-Medium.ttf",
      weight: "500",
      style: "medium", //weight 500
    },
    {
      path: "../assets/fonts/Quicksand-SemiBold.ttf",
      weight: "600",
      style: "semibold", //weight 600
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "700",
      style: "bold", //weight 700
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "800",
      style: "extrabold", //weight 800
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "900",
      style: "blackbold", //weight 900
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={quicksand.className}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
