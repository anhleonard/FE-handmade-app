"use client";
import storage from "@/apis/storage";
// import HomePage from "@/components/dashboard/home-page";
import DefaultLayout from "@/components/layouts/default-layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const HomePage = dynamic(
  () => {
    return import("@/components/dashboard/home-page");
  },
  { ssr: false },
);

export default function Home() {
  const router = useRouter();
  const token = storage.getLocalAccessToken();

  const checkingToken = () => {
    if (!token) {
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    checkingToken();
  }, []);

  return (
    <>
      {token ? (
        <DefaultLayout>
          <HomePage />
        </DefaultLayout>
      ) : null}
    </>
  );
}
