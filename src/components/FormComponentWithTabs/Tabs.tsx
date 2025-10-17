import React, { Suspense, useState } from "react";
import "./styles.css";
import Profile from "./components/Profile";
import { TabFormContext } from "../../context/TabFormContext";
import { Data, TabComponent } from "../../typings/tabForm";
import Interests from "./components/Interests";

const Tabs = () => {
  const [data, setData] = useState<Data>({
    name: "Test",
    age: 22,
    email: "aagrwalmohit43@gmail.com",
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
  });
  const [activeIndex, setActiveIndex] = useState(0);
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
      component: React.lazy(() => import("./components/Settings")),
    },
  ];

  const ActiveTabComponents = tabsConfig[activeIndex].component;

  return (
    <div>
      <div className="tabs-container">
        {tabsConfig.map((tab, index) => {
          return (
            <div
              key={index}
              className={`tab-box ${activeIndex === index && "active-tab"}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tabs-display">
        <Suspense fallback={<div>Loading....</div>}>
          <ActiveTabComponents data={data} setData={setData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Tabs;
