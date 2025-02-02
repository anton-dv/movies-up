import { FC } from "react";
import classes from "./message.module.scss";

export const NotFound: FC = () => {
  return <span className={classes.message}>Not Found &#x1F9D0;</span>;
};
