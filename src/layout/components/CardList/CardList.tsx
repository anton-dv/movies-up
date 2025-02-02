import { Col, Row } from "antd";
import { FC } from "react";
import { Card } from "../Card/Card";
import { Pagination } from "../../ui/Pagination/Pagination";
import { Page } from "../../../api/types/Page";

import classes from "./card-list.module.scss";

export type CardListProps = {
  page: Page;
  onSwitch: (index: number) => void;
};

export const CardList: FC<CardListProps> = ({ page, onSwitch }) => {
  return (
    <>
      <Row gutter={[16, 16]} className={classes["card-list"]}>
        {page.movies.map((movie, index) => (
          <Col key={index} span={24} md={12}>
            <Card {...movie} />
          </Col>
        ))}
      </Row>
      <Pagination current={page.current} total={page.total} onSwitch={onSwitch} />
    </>
  );
};
