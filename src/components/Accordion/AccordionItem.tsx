import React from "react";
import { AccordionStructure } from "../../typings/accordion";

interface AccordionItemProps {
  item: AccordionStructure;
  handleAccordionToggle: (id: string) => void;
}

const AccordionItem = ({
  item,
  handleAccordionToggle,
}: Readonly<AccordionItemProps>) => {
  const { title, content, isOpened = false } = item;

  return (
    <div
      className="accordion-item"
      style={{ border: "1px solid black", textAlign: "left" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => handleAccordionToggle(item.id)}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            padding: "16px",
          }}
        >
          {title}
        </span>
        <span style={{ padding: "16px" }}>{`${
          isOpened ? "Close" : "Open"
        }`}</span>
      </div>
      {isOpened && <p>{content}</p>}
    </div>
  );
};

export default React.memo(AccordionItem, (prevProps, nextProps) => {
  // return true to skip re-render, false to re-render
  return prevProps.item.isOpened === nextProps.item.isOpened;
});
