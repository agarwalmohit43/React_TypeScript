import { Suspense, useState } from "react";
import "./styles.css";
import { Data } from "../../typings/tabForm";
import { initialValue, tabsConfig } from "../../constants/tabForm";
const Tabs = () => {
  const [data, setData] = useState<Data>(initialValue);
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveTabComponents = tabsConfig[activeIndex].component;

  const handleSubmit = () => {
    console.log(data);
  };

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
      <div className="action-navigatio-submit-btns">
        {activeIndex > 0 && (
          <button
            className="action-btns"
            disabled={!data.isValid}
            onClick={() => setActiveIndex((index) => index - 1)}
          >
            Prev
          </button>
        )}
        {activeIndex < tabsConfig.length - 1 && (
          <button
            className="action-btns"
            disabled={!data.isValid}
            onClick={() => setActiveIndex((index) => index + 1)}
          >
            Next
          </button>
        )}
        {activeIndex === tabsConfig.length - 1 && (
          <button
            className="action-btns"
            disabled={!data.isValid}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Tabs;
