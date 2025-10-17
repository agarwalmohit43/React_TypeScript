import {
  Dispatch,
  SetStateAction,
  createContext,
} from "react";
import { Data } from "../typings/tabForm";

interface TabFormContextProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

export const TabFormContext = createContext<TabFormContextProps | null>(null);
