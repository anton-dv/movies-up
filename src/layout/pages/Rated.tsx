import { FC, useLayoutEffect } from "react";
import { CardList } from "../components/CardList/CardList";
import { NoInternet } from "../ui/Message/NoInternet";
import { Empty } from "../ui/Message/Empty";
import { useAction } from "../../hooks/useAction";
import { useRated } from "../../hooks/useRated";
import { Waiting } from "../ui/Message/Waiting";
import { ErrorStatus, isErrorStatus } from "../../types/ErrorStatus";
import { Page } from "../../api/types/Page";

import classes from "./page.module.scss";

export type RatedProps = {
  visible: boolean;
};

export const Rated: FC<RatedProps> = ({ visible }) => {
  const [page] = useRated();
  const action = useAction();

  useLayoutEffect(() => {
    action.switchRatedPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSwitch = (index: number) => {
    action.switchRatedPage(index);
  };

  return (
    <div className={`${classes.page} ${visible ? "" : classes["page--hidden"]}`}>
      {page === undefined && <Waiting />}
      {page === ErrorStatus.NO_INTERNET && <NoInternet />}
      {page === ErrorStatus.EMPTY && <Empty />}
      {page && !isErrorStatus(page as ErrorStatus) && (
        <CardList page={page as Page} onSwitch={onSwitch} />
      )}
    </div>
  );
};
