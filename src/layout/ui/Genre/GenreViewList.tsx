import { FC, useEffect, useLayoutEffect, useState } from "react";
import { GenreView } from "./GenreView";

import classes from "./genre-view.module.scss";
import { createId } from "../../../utils/createId";

export type GenreViewListProps = {
  names: string[];
};

export const GenreViewList: FC<GenreViewListProps> = ({ names }) => {
  const [content, setContent] = useState<string[]>([]);
  const [componentId] = useState(`${names.join("-")}-${createId()}`);

  const componentMeasureId = `${componentId}-measure-id`;

  const getRatio = () => {
    const measureBlock = document.getElementById(componentMeasureId);
    const listBlock = document.getElementById(componentId);
    const measure = measureBlock?.getBoundingClientRect().width;
    const list = listBlock?.getBoundingClientRect().width;

    if (!measure || !list || measure <= list) return 1;
    return list / measure - 0.15;
  };

  const setContentItems = () => {
    const ratio = getRatio();

    if (ratio === 1) {
      setContent(names);
      return;
    }

    const endOfList = Math.floor(names.length * ratio);
    setContent([...names.slice(0, endOfList), "..."]);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", setContentItems);
    setContentItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setContentItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names]);

  return (
    <div id={componentId} className={classes["genre-view-list"]}>
      <div id={componentMeasureId} className={classes["genre-view-list__measure"]}>
        {names.map((name, index) => (
          <GenreView name={name} key={index} />
        ))}
      </div>

      {content.map((name, index) => (
        <GenreView name={name} key={index} />
      ))}
    </div>
  );
};
