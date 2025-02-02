import { Tabs as AntTabs } from "antd";
import { FC } from "react";
import { TabMode } from "../../../types/TabMode";
import { useTabs } from "../../../hooks/useTabs";

export const Tabs: FC = () => {
  const [, setTab] = useTabs();

  const onChange = (key: string) => setTab(key as TabMode);
  const keys = Object.values(TabMode);

  return (
    <AntTabs
      defaultActiveKey={TabMode.Search}
      centered
      indicator={{ size: 65 }}
      tabBarGutter={40}
      onChange={onChange}
      tabBarStyle={{ width: "139px", marginInline: "auto" }}
      items={keys.map(page => ({
        label: page,
        key: page,
      }))}
    />
  );
};
