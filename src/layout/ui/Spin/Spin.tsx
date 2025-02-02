import { FC } from "react";
import { Spin as AntSpin } from "antd";
import classes from "./spin.module.scss";

export type SpinProps = {
  visible: boolean;
};

export const Spin: FC<SpinProps> = ({ visible }) => {
  return (
    <div className={classes.spin} style={!visible ? { display: "none" } : undefined}>
      <AntSpin />
    </div>
  );
};
