import Image from "next/image";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center bg-primary-c50 py-8">
      <div className="h-[90vh] w-[80vw] md:px-26 lg:px-16">
        <div className="grid h-full w-full overflow-hidden rounded-lg lg:grid-cols-2">
          {/* left content */}
          <div className="relative col-span-1 hidden h-full w-full lg:block">
            {/* image */}
            <Image
              src="/images/seller-login-bg.svg"
              alt="bg-auth"
              fill
              objectFit="cover"
            />

            {/* lớp phủ trắng */}
            <div className="absolute right-0 top-0 h-full w-1/2">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent"></div>
              </div>
            </div>

            <div className="relative h-full w-full">
              <div className="absolute inset-0 left-8 top-6">
                <div className="text-4xl font-bold text-white">HANDMADE</div>
                <div className="text-lg font-semibold text-white">
                  Nơi dừng chân của mọi gian hàng!
                </div>
              </div>
            </div>
          </div>

          {/* right content */}
          <div className="flex flex-col gap-8 bg-white px-10 pt-16 md:gap-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
