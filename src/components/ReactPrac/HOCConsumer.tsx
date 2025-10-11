import { accordionData } from "../../constants/accordion";
import { Accordion } from "../Accordion";
import HOCWrapper from "./HOCWrapper";

const HOCConsumer = () => {
  const EnhancedAccordion = HOCWrapper(Accordion);
  return (
    <div>
      HOCConsumer
      <div>
        <EnhancedAccordion data={accordionData} />
      </div>
    </div>
  );
};

export default HOCConsumer;
