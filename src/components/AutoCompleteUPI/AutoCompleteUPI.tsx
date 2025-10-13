import { useEffect, useState } from "react";

const AutoCompleteUPI = () => {
  const [upiId, setUpiId] = useState("");
  const [showUpiAddress, setShowUpiAddress] = useState(false);
  const upiAddresses = ["okaxis", "ybl", "okicici", "okhdfcbank", "bhimupi"];
  const delimeter = "@";

  useEffect(() => {
    if (upiId.includes(delimeter)) {
      setShowUpiAddress(true);
    } else {
      setShowUpiAddress(false);
    }
  }, [upiId]);

  //   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //     const { key } = event;
  //     console.log(key);
  //     if (key === delimeter) {
  //       setShowUpiAddress(true);
  //     }

  //     if (key === "Backspace") {
  //     }
  //   };

  const handleSelect = (address: string) => {
    const atIndex = upiId.indexOf(delimeter);
    let newVal: string;
    if (atIndex === -1) {
      newVal = `${upiId}${delimeter}${address}`;
    } else {
      newVal = `${upiId.slice(0, atIndex + 1)}${address}`;
    }

    setUpiId(newVal);
    setShowUpiAddress(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      AutoCompleteUPI
      <div>
        <input
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          //   onKeyDown={(e) => handleKeyDown(e)}
        />
        <div
          style={{
            visibility: showUpiAddress ? "visible" : "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {upiAddresses.map((upi, index) => {
            return (
              <li
                key={index}
                onMouseDown={(e) => {
                  // use onMouseDown to avoid losing focus before click handled
                  e.preventDefault();
                  handleSelect(upi);
                }}
                onClick={() => {
                  setShowUpiAddress(false);
                }}
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                }}
              >
                {upi}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteUPI;
