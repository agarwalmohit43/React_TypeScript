import React, { useRef, useState } from "react";
import "./styles.css";

const OTPInputType2 = () => {
  const length = 4;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const moveForward = (index: number) => {
    if (index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const moveBackWard = (index: number) => {
    if (index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleOTPChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    setOtp((prev) => {
      prev[index] = value;
      return [...prev];
    });

    moveForward(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = event;
    if (key === "Backspace") {
      event.preventDefault();
      setOtp((prev) => {
        prev[index] = "";
        return [...prev];
      });
      moveBackWard(index);
    }
    const ascii = Number(key.length === 1 && key.charCodeAt(0));
    if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
      event.preventDefault();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      OTPInputType2
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        {otp.map((otp, index) => {
          return (
            <input
              type="text"
              value={otp}
              className="otp-input"
              ref={(e) => (inputRef.current[index] = e)}
              onChange={(e) => handleOTPChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              minLength={1}
              required
            />
          );
        })}
      </div>
    </div>
  );
};

export default OTPInputType2;
