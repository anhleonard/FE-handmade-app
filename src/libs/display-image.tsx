import Image from "next/image";
import React, { useState } from "react";

type MyDisplayImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  rounded?: string;
};

const MyDisplayImage = ({
  src,
  alt,
  width = "w-[70px]",
  height = "h-[70px]",
  rounded = "8px",
}: MyDisplayImageProps) => {
  return (
    <div
      className={`relative ${width} ${height} transition duration-300 hover:scale-105 hover:cursor-pointer`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", borderRadius: rounded }}
        className="hover:opacity-90"
        sizes="100px"
      />
    </div>
  );
};

export default MyDisplayImage;
