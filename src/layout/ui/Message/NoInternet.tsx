import { FC } from "react";
import classes from "./message.module.scss";

export const NoInternet: FC = () => {
  return <span className={classes.message}>No Internet &#x1F61E;</span>;
};
