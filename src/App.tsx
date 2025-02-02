import { Tabs } from "./layout/components/Tabs/Tabs";
import { Input } from "./layout/ui/Input/Input";
import { TabMode } from "./types/TabMode";
import { useTabs } from "./hooks/useTabs";
import { Search } from "./layout/pages/Search";
import { Rated } from "./layout/pages/Rated";

function App() {
  const [tab] = useTabs();

  return (
    <div style={{ padding: "15px" }}>
      <Tabs />
      <Input />
      <Search visible={tab === TabMode.Search} />
      <Rated visible={tab === TabMode.Rated} />
    </div>
  );
}

export default App;
