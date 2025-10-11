import { AccordionStructure } from "../typings/accordion";

const accordionData: AccordionStructure[] = [
  {
    id: crypto.randomUUID(),
    title: "Accordion Title 1",
    content: "Content 1",
    isOpened: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Accordion Title 2",
    content: "Content 2",
  },
  {
    id: crypto.randomUUID(),
    title: "Accordion Title 3",
    content: "Content 3",
  },
  {
    id: crypto.randomUUID(),
    title: "Accordion Title 4",
    content: "Content 4",
  },
];

export { accordionData };
