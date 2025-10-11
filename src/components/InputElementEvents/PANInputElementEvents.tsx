import React from "react";

const PANInputElementEvents = () => {
  const panHandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);

    const { key, target } = event;
    const input = target as HTMLInputElement;
    // if (["Tab", "Enter"].includes(key)) {
    //   alert("This is not allowed");
    // }
    // example logic: first 5 must be letters
    const pos = input.selectionStart ?? input.value.length;
    const isLetter = /^[A-Z]$/i.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (pos < 5 && !isLetter) {
      event.preventDefault();
    } else if (pos >= 5 && pos < 9 && !isDigit) {
      event.preventDefault();
    } else if (pos === 9 && !isLetter) {
      event.preventDefault();
    }
  };

  const panHandleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    console.log(target);
  };
  return (
    <>
      <div>InputElementEvents</div>
      <div>
        <h3>PAN Input</h3>
        <input
          type="text"
          onKeyDown={panHandleKeyDown}
          maxLength={10}
          onChange={panHandleOnChange}
        />
      </div>
    </>
  );
};

export default PANInputElementEvents;
