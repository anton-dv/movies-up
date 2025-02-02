import { FC } from "react";
import { format } from "date-fns";

import classes from "./date-view.module.scss";

export type DateViewProps = {
  date?: Date;
};

export const DateView: FC<DateViewProps> = ({ date }) => {
  const datetime = date ? format(date, "LLLL d, yyyy") : "date: unknown";

  return <span className={classes["date-view"]}>{datetime}</span>;
};
