import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { FontSize } from "@/enum/setting";
import { ChangeEvent, MouseEvent } from "react";

type MainInputImageProps = {
  id: string;
  name: string;
  previewImage: string;
  width?: string;
  height?: string;
  rounded?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage?: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

export default function MainInputImage({
  id,
  name,
  previewImage,
  onChange,
  width = "!w-[250px]",
  height = "!h-[250px]",
  rounded = "!rounded-2xl",
  onDeleteImage,
  className = "",
}: MainInputImageProps) {
  return (
    <div className={className}>
      {previewImage && (
        <div className="relative">
          <Image
            alt="Announcement"
            unoptimized
            loader={() => previewImage}
            src={previewImage}
            width="0"
            height="0"
            className={`${width} ${height} ${rounded} object-cover`}
          ></Image>
          <div
            onClick={onDeleteImage}
            className="absolute right-[-16px] top-[-6px] rounded-full hover:cursor-pointer"
          >
            <CloseIcon
              style={{ color: "black", width: "16px", height: "16px" }}
            />
          </div>
        </div>
      )}
      {!previewImage && (
        <div
          onClick={() => document.getElementById(`${id}`)?.click()}
          className={`${width} ${height} ${rounded} flex flex-col items-center justify-center border-[2px] border-grey-c50 hover:cursor-pointer hover:bg-grey-c10`}
        >
          <PhotoCameraBackIcon
            style={{
              width: "24px",
              height: "24px",
            }}
            className="text-grey-c200"
          />
          <div className={`text-xs text-grey-c400`}>Upload</div>
        </div>
      )}
      <div className="hidden items-center px-8">
        <input
          type="file"
          accept="image/*"
          id={id}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
