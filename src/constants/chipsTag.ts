import { ChipsTagInterface } from "../typings/chipsTag";

const initialValue: ChipsTagInterface[] = [
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    tagName: "Hello Tag",
  },
  {
    id: (crypto as any)?.randomUUID?.() || Math.random().toString(36).slice(2),
    tagName: "Chips",
  },
];

export { initialValue };
