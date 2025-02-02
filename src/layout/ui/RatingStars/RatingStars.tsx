import { ConfigProvider, Rate } from "antd";
import { FC } from "react";

import classes from "./rating-stars.module.scss";

export type RatingStarsProps = {
  value?: number;
  onRate?: (value: number) => void;
};

export const RatingStars: FC<RatingStarsProps> = ({ value, onRate }) => {
  const ratingTheme = {
    components: {
      Rate: {
        starSize: 17,
      },
    },
  };

  return (
    <ConfigProvider theme={ratingTheme}>
      <Rate count={10} className={classes["rating-stars"]} defaultValue={value} onChange={onRate} />
    </ConfigProvider>
  );
};
