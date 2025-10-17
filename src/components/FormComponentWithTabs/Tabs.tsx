import { Suspense, useState } from "react";
import "./styles.css";
import { Data, TabFormErrors } from "../../typings/tabForm";
import { initialValue, tabsConfig } from "../../constants/tabForm";
const Tabs = () => {
  const [data, setData] = useState<Data>(initialValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errors, setErrors] = useState<TabFormErrors>({});

  const ActiveTabComponents = tabsConfig[activeIndex].component;

  const handleSubmit = () => {
    console.log(data);
  };

  const disableActionButtons = () => {
    if (!data.isValid) {
      return true;
    }
    if (Object.keys(errors).length !== 0) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="tabs-container">
        {tabsConfig.map((tab, index) => {
          return (
            <div
              key={index}
              className={`tab-box ${activeIndex === index && "active-tab"}`}
              onClick={() =>
                disableActionButtons() ? undefined : setActiveIndex(index)
              }
              style={{
                cursor: disableActionButtons() ? "not-allowed" : "pointer",
              }}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tabs-display">
        <Suspense fallback={<div>Loading....</div>}>
          <ActiveTabComponents
            data={data}
            setData={setData}
            errors={errors}
            setErrors={setErrors}
            validate={tabsConfig[activeIndex]?.validate}
          />
        </Suspense>
      </div>
      <div className="action-navigatio-submit-btns">
        {activeIndex > 0 && (
          <button
            className="action-btns"
            disabled={disableActionButtons()}
            onClick={() => setActiveIndex((index) => index - 1)}
          >
            Prev
          </button>
        )}
        {activeIndex < tabsConfig.length - 1 && (
          <button
            className="action-btns"
            disabled={disableActionButtons()}
            onClick={() => setActiveIndex((index) => index + 1)}
          >
            Next
          </button>
        )}
        {activeIndex === tabsConfig.length - 1 && (
          <button
            className="action-btns"
            disabled={disableActionButtons()}
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
