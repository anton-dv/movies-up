import { FC } from "react";
import classes from "./title.module.scss";

export type TitleProps = {
  children?: string;
};

export const Title: FC<TitleProps> = ({ children }) => {
  return <h2 className={classes.title}>{children || "-"}</h2>;
};
