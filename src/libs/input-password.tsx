import MyTextField from "@/libs/text-field";
import React, { useState } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { COLORS } from "@/enum/colors";

type InputPasswordProps = {
  id: string;
  name?: string;
  title?: string;
  placeholder?: string;
  isError?: boolean;
  isRequired?: boolean;
  helperText?: string | null;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement & HTMLInputElement>;
};

const InputPassword = ({
  id,
  name,
  title,
  placeholder,
  isError,
  isRequired = true,
  helperText,
  onChange = () => null,
}: InputPasswordProps) => {
  const [type, setType] = useState<"number" | "password" | "text" | undefined>(
    "password",
  );

  return (
    <MyTextField
      className="!w-full"
      id={id}
      name={name}
      title={title}
      isRequired={isRequired}
      placeholder={placeholder}
      isError={isError}
      helperText={helperText}
      type={type}
      onChange={onChange}
      endIcon={
        type === "password" ? (
          <div onClick={() => setType("text")}>
            <VisibilityOffRoundedIcon
              sx={{ color: COLORS.grey.c900, fontSize: 18 }}
            />
          </div>
        ) : (
          <div onClick={() => setType("password")}>
            <VisibilityRoundedIcon
              sx={{ color: COLORS.grey.c900, fontSize: 18 }}
            />
          </div>
        )
      }
    />
  );
};

export default InputPassword;
