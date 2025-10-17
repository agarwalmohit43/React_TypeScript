import React, { Dispatch, SetStateAction } from "react";
import Interests from "../components/FormComponentWithTabs/components/Interests";
import Profile from "../components/FormComponentWithTabs/components/Profile";
import {
  Data,
  TabComponent,
  TabFormErrors,
  ValidateFormErrors,
} from "../typings/tabForm";

const tabsConfig: {
  name: string;
  component: TabComponent;
  validate?: ValidateFormErrors;
}[] = [
  {
    name: "Profile",
    component: Profile,
    validate: (
      data: Data,
      setError: Dispatch<SetStateAction<TabFormErrors>>
    ) => {
      const error: Record<string, string> = {};
      if (!data.name || data.name.length < 2) {
        error.name = "Name is not valid";
      }

      if (!data.age || data.age < 18) {
        error.age = "User is minor";
      }

      if (!data.email || data.email.length < 5) {
        error.email = "Email is not valid";
      }
      setError((prev: any) => ({
        ...prev,
        ...error,
      }));
    },
  },
  {
    name: "Interests",
    // component: React.lazy(() => import("./components/Interests")),
    component: Interests,
  },
  {
    name: "Settings",
    component: React.lazy(
      () => import("../components/FormComponentWithTabs/components/Settings")
    ),
  },
];

const initialValue: Data = {
  name: "Test",
  age: 22,
  email: "agrwalmohit43@gmail.com",
  interests: [
    {
      name: "coding",
      isChecked: true,
    },
    {
      name: "exploring",
      isChecked: true,
    },
    {
      name: "workout",
      isChecked: true,
    },
  ],
  config: {
    theme: "dark",
    role: "normal",
  },
  isValid: true,
};

export { tabsConfig, initialValue };
