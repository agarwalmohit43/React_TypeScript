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
    theme: "dark" | "light";
    role: "admin" | "normal";
  };
  isValid: boolean;
}

export type TabFormErrors = Partial<Record<keyof Data, string>>;

export type ValidateFormErrors = (
  data: Data,
  setError: Dispatch<SetStateAction<TabFormErrors>>
) => void;
export interface TabFormChildComponentProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  errors: TabFormErrors;
  setErrors: Dispatch<SetStateAction<TabFormErrors>>;
  validate?: ValidateFormErrors;
}

export type TabComponent =
  | ComponentType<any>
  | LazyExoticComponent<ComponentType<any>>;
