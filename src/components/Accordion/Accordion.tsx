import React, { useState, useCallback } from "react";
import { AccordionStructure } from "../../typings/accordion";
import AccordionItem from "./AccordionItem";
interface AccordionProps {
  data: AccordionStructure[];
}

const Accordion = (props: Readonly<AccordionProps>) => {
  const { data } = props;
  const [accordionData, setAccordionData] =
    useState<AccordionStructure[]>(data);

  const handleAccordionToggle = useCallback((id: string) => {
    setAccordionData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpened: !item.isOpened } : item
      )
    );
  }, []);

  if (data.length === 0) return null;

  console.log(props);

  return (
    <>
      <div>Accordion</div>
      {accordionData.length &&
        accordionData.map((item: AccordionStructure) => {
          return (
            <AccordionItem
              key={item.title}
              item={item}
              handleAccordionToggle={handleAccordionToggle}
            />
          );
        })}
    </>
  );
};

export default Accordion;
