import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { FontSize } from "@/enum/setting";
import { ChangeEvent, MouseEvent } from "react";

type SmallInputImageProps = {
  id: string;
  name: string;
  previewImage: string;
  width?: string;
  height?: string;
  rounded?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage?: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function SmallInputImage({
  id,
  name,
  previewImage,
  onChange,
  width = "!w-[250px]",
  height = "!h-[250px]",
  rounded = "!rounded-2xl",
  onDeleteImage,
}: SmallInputImageProps) {
  return (
    <div className="h-[52px] w-[52px]">
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
              width: "20px",
              height: "20px",
            }}
            className="text-grey-c200"
          />
          <div className={`text-[10px] text-grey-c400`}>Upload</div>
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
