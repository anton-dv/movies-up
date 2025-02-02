import { FC } from "react";
import { CardList } from "../components/CardList/CardList";
import { NoInternet } from "../ui/Message/NoInternet";
import { NotFound } from "../ui/Message/NotFound";
import { Waiting } from "../ui/Message/Waiting";
import { useSearch } from "../../hooks/useSearch";
import { useAction } from "../../hooks/useAction";
import { ErrorStatus, isErrorStatus } from "../../types/ErrorStatus";
import { Page } from "../../api/types/Page";

import classes from "./page.module.scss";

export type SearchProps = {
  visible: boolean;
};

export const Search: FC<SearchProps> = ({ visible }) => {
  const [page] = useSearch();
  const action = useAction();

  const onSwitch = (index: number) => {
    action.switchSearchPage(index);
  };

  return (
    <div className={`${classes.page} ${visible ? "" : classes["page--hidden"]}`}>
      {page === undefined && <Waiting />}
      {page === ErrorStatus.NO_INTERNET && <NoInternet />}
      {page && !isErrorStatus(page as ErrorStatus) && !(page as Page).movies.length && <NotFound />}
      {page && !isErrorStatus(page as ErrorStatus) && (page as Page).movies.length !== 0 && (
        <CardList page={page as Page} onSwitch={onSwitch} />
      )}
    </div>
  );
};
