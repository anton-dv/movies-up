import { FC } from "react";
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
