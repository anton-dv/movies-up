import { PageValue } from "../../api/types/PageValue";

export type SearchContextType = [PageValue, React.Dispatch<React.SetStateAction<PageValue>>];
