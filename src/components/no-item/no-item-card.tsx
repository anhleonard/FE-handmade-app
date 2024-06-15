import React from "react";

type Props = {
  title: string;
};

const NoItemCard = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-grey-c10 py-10">
      <img src="/images/no-items.svg" alt="no-item-card" className="block" />
      <div className="text-sm font-medium text-grey-c900">{title}</div>
    </div>
  );
};

export default NoItemCard;
