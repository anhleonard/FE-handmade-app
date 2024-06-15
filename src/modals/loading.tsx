"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Loading() {
  const loadingData: any = useSelector((state: RootState) => state.loading);

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={!loadingData.isOpen}
    >
      <div className="fixed top-0 h-screen w-full flex flex-col justify-center items-center z-50 ">
        <div className="rounded-full animate-spin">
          <Image
            alt="loading"
            src={"/dual-ring.png"}
            width={150}
            height={150}
          />
        </div>
      </div>
      <div className="fixed inset-0 transition-opacity blur-sm bg-white/40 z-10"></div>
    </div>
  );
}
