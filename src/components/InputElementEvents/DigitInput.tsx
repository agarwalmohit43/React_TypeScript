import React from "react";

const DigitInput = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = event;
    const ascii = Number(key.length === 1 && key.charCodeAt(0));
    if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div>DigitInput</div>
      <div>
        <input
          type="text"
          inputMode="numeric"
          onKeyDown={handleKeyDown}
          maxLength={5}
        />
        {/* <input type="text" inputMode="numeric" maxLength={5} /> */}
      </div>
    </>
  );
};

export default DigitInput;
