import React from "react";

const ProgramCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Sự kiện cùng Handmade
        </h5>
      </div>
    </div>
  );
};

export default ProgramCard;
