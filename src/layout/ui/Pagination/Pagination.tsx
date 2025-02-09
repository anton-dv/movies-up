import { FC, useEffect } from "react";
import { Pagination as AntPagination, ConfigProvider } from "antd";

const paginationTheme = {
  components: {
    Pagination: {
      itemActiveBg: "#157CDB",
    },
  },
};

export type PaginationProps = {
  current: number;
  total: number;
  onSwitch: (index: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ current, total, onSwitch }) => {
  useEffect(() => {
    const first = document.querySelector(".ant-pagination-item.ant-pagination-item-1");
    const last = document.querySelector(`.ant-pagination-item.ant-pagination-item-${total}`);

    if (current >= 4) {
      if (first) first.classList.add("hidden");
    } else if (first) first.classList.remove("hidden");

    if (current < total - 3) {
      if (last) last.classList.add("hidden");
    } else if (last) last.classList.remove("hidden");
  }, [current, total]);

  if (!total || total === 1) return undefined;

  return (
    <ConfigProvider theme={paginationTheme}>
      <AntPagination
        total={total * 10}
        current={current}
        onChange={onSwitch}
        size="small"
        align="center"
      />
    </ConfigProvider>
  );
};
