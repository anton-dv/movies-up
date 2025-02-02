import { FC } from "react";
import classes from "./message.module.scss";

export const Empty: FC = () => {
  return <span className={classes.message}>Empty</span>;
};
