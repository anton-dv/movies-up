import { FC } from "react";
import classes from "./genre-view.module.scss";

export type GenreViewProps = {
  name: string;
};

export const GenreView: FC<GenreViewProps> = ({ name }) => {
  return <button className={classes["genre-view"]}>{name}</button>;
};
