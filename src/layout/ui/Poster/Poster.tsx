import { Image } from "antd";
import { FC } from "react";
import classes from "./poster.module.scss";

export type PosterProps = {
  image: string;
  onLoad?: () => void;
  onError?: () => void;
};

export const Poster: FC<PosterProps> = ({ image, onLoad, onError }) => {
  return (
    <Image
      onLoad={onLoad}
      onError={onError}
      className={classes.poster}
      src={`https://image.tmdb.org/t/p/w185${image}`}
      style={{ height: "100%" }}
    />
  );
};
