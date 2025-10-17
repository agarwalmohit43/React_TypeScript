import React from "react";
import Interests from "../components/FormComponentWithTabs/components/Interests";
import Profile from "../components/FormComponentWithTabs/components/Profile";
import { Data, TabComponent } from "../typings/tabForm";

const tabsConfig: { name: string; component: TabComponent }[] = [
  {
    name: "Profile",
    component: Profile,
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
  }

export { tabsConfig, initialValue };
