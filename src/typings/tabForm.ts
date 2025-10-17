import {
  ComponentType,
  Dispatch,
  LazyExoticComponent,
  SetStateAction,
} from "react";

export interface InterestsData {
  name: string;
  isChecked: boolean;
}

export interface Data {
  name: string;
  age: number;
  email: string;
  interests: InterestsData[];
  config: {
    theme?: string;
    role: "admin" | "normal";
  };
}

export interface TabFormChildComponentProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

export type TabComponent =
  | ComponentType<any>
  | LazyExoticComponent<ComponentType<any>>;
