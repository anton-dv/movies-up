import { Input as AntInput } from "antd";
import { FC, useEffect } from "react";

import _ from "lodash";
import classes from "./input.module.scss";
import { useAction } from "../../../hooks/useAction";

export const Input: FC = () => {
  const action = useAction();

  useEffect(() => {
    action.search("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.currentTarget.value.trim();
      action.search(search);
    },
    import.meta.env.API_REQUEST_DELAY,
  );

  return (
    <div className={classes["input-wrapper"]}>
      <AntInput className={classes.input} placeholder="Type to search..." onChange={onChange} />
    </div>
  );
};
