import { FC } from "react";

import classes from "./rating-view.module.scss";

export type RatingViewProps = {
  value?: number;
};

export const RatingView: FC<RatingViewProps> = ({ value }) => {
  const ratingFormat = (rating?: number) => {
    if (!rating) return "N/A";
    if (rating >= 10) return rating.toString();
    return rating.toFixed(1).padStart(3, "0");
  };

  const colorForValue = (rating?: number) => {
    if (!rating) return "#bfbebe";
    if (rating <= 3) return "#e90000";
    if (rating >= 3 && rating < 5) return "#e97e00";
    if (rating >= 5 && rating < 7) return "#e9d100";
    return "#66e900";
  };

  return (
    <div className={classes["rating-view"]} style={{ outlineColor: colorForValue(value) }}>
      {ratingFormat(value)}
    </div>
  );
};
