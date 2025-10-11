import { AccordionStructure } from "../typings/accordion";

const accordionData: AccordionStructure[] = [
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    title: "Accordion Title 1",
    content: "Content 1",
    isOpened: true,
  },
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    title: "Accordion Title 2",
    content: "Content 2",
  },
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    title: "Accordion Title 3",
    content: "Content 3",
  },
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    title: "Accordion Title 4",
    content: "Content 4",
  },
];

export { accordionData };
