import React, { Suspense, useState } from "react";
import "./styles.css";
import Profile from "./components/Profile";

const Interests = React.lazy(() => import("./components/Interests"));
const Settings = React.lazy(() => import("./components/Settings"));

const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsConfig = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interests",
      component: Interests,
    },
    {
      name: "Settings",
      component: Settings,
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
              className="tab-box"
              onClick={() => setActiveIndex(index)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tabs-display">
        <Suspense fallback={<div>Loading....</div>}>
          <ActiveTabComponents />
        </Suspense>
      </div>
    </div>
  );
};

export default Tabs;
