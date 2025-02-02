import { FC } from "react";
import { Spin } from "antd";

import classes from "./message.module.scss";

export const Waiting: FC = () => {
  return (
    <span className={classes.message}>
      <Spin />
    </span>
  );
};
