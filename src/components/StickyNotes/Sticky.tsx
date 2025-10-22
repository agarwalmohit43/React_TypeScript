// modules
import React from "react";
// typings
import { StickyNoteData } from "../../typings/stickyNotes";

interface StickyProps {
  data: StickyNoteData;
}

const Sticky = ({ data }: Readonly<StickyProps>) => {
  return <div className="sticky-message">{data?.message}</div>;
};

export default React.memo(Sticky);
