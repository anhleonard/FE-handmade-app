import { COLORS } from "@/enum/colors";
import { Slider } from "@mui/material";

type ShowingRatingProps = {
  title?: string;
  defaultValue: number;
  rateLabel?: string;
  className?: string;
  min?: number;
  max?: number;
  color?: string;
};

const ShowingRating = ({
  title,
  defaultValue,
  rateLabel = defaultValue.toString() + ".0",
  className = "",
  min = 0,
  max = 5,
  color = COLORS.grey.c700,
}: ShowingRatingProps) => {
  return (
    <div className="flex flex-col text-sm">
      {title && <div>{title}</div>}
      <div className="flex flex-row items-center gap-3">
        <Slider
          aria-label="rating-value"
          defaultValue={defaultValue}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          min={min}
          max={max}
          className={className}
          disabled
          sx={{
            padding: "0px",
            "&.Mui-disabled": {
              color: color,
            },
            "& .MuiSlider-thumb": {
              height: 4,
              width: 4,
            },
          }}
        />
        <div className="text-xs">{rateLabel}</div>
      </div>
    </div>
  );
};

export default ShowingRating;
