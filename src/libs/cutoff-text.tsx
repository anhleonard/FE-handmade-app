import { ReactNode } from "react";

type MyCutOffTextProps = {
  content?: string;
};
const MyCutOffText = ({ content }: MyCutOffTextProps) => {
  return (
    <>
      <div className="cutoff-text max-w-[300px]">{content}</div>
      {content != null && content.length > 44 && (
        <input
          type="checkbox"
          className="expand-button mt-1 cursor-pointer appearance-none"
        />
      )}
    </>
  );
};

export default MyCutOffText;
