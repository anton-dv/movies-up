import { FC, useEffect, useState } from "react";
import { Title } from "../../ui/Title/Title";
import { RatingView } from "../../ui/RatingView/RatingView";
import { DateView } from "../../ui/DateView/DateView";
import { TextBlock } from "../../ui/TextBlock/TextBlock";
import { RatingStars } from "../../ui/RatingStars/RatingStars";
import { GenreViewList } from "../../ui/Genre/GenreViewList";
import { Poster } from "../../ui/Poster/Poster";
import { Spin } from "../../ui/Spin/Spin";
import { useSearch } from "../../../hooks/useSearch";
import { ErrorStatus } from "../../../types/ErrorStatus";
import { useAction } from "../../../hooks/useAction";

import classes from "./card.module.scss";

export type CardProps = {
  id: number;
  title?: string;
  image?: string;
  rating?: number;
  rated?: number;
  about?: string;
  genres?: string[];
  date?: Date;
};

export const Card: FC<CardProps> = ({ id, title, image, rating, rated, about, genres, date }) => {
  const [, setPage] = useSearch();
  const [loading, setLoading] = useState(true);
  const action = useAction();

  useEffect(() => {
    if (image) setLoading(true);
    else setLoading(false);
  }, [title, image]);

  const onLoad = () => setLoading(false);
  const onError = () => {
    setPage(ErrorStatus.NO_INTERNET);
    setLoading(false);
  };

  const onRate = async (value: number) => {
    await action.rateMovie(id, value);
  };

  const imageExist = <Poster image={image as string} onLoad={onLoad} onError={onError} />;
  const imageNotExist = <div className={classes["card__not-fount-image"]}>N/A</div>;

  return (
    <div className={classes.card}>
      <Spin visible={loading} />
      <div className={classes.card__image}>{image ? imageExist : imageNotExist}</div>
      <div className={classes.card__content}>
        <div className={classes.card__info}>
          <RatingView value={rating} />
          <Title>{title}</Title>
          <DateView date={date} />
          {genres && <GenreViewList names={genres} />}
          <TextBlock text={about} padding={!genres} id={title as string} />
        </div>
        <div className={classes.card__rating}>
          <RatingStars value={rated || rating} onRate={onRate} />
        </div>
      </div>
    </div>
  );
};
