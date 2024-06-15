import React from "react";
import AuthLayout from "../../auth-layout";

const CreatedStorePage = () => {
  return (
    <AuthLayout>
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <img
          src="/images/created-success.png"
          alt="created-store-successfully"
          className="h-20 w-20"
        />
        <div className="text-2xl font-bold text-primary-c900">
          ĐĂNG KÝ THÀNH CÔNG
        </div>
        <div className="text-center text-base font-medium text-grey-c900">
          Thông tin của bạn đã được gửi tới ban quản trị để kiểm duyệt. Hãy kiểm
          tra email trong vòng 3 - 5 ngày tới!
        </div>
      </div>
    </AuthLayout>
  );
};

export default CreatedStorePage;
