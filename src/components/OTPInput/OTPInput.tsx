import React, { useRef, useState } from "react";
import "./styles.css";

const OTPInput = () => {
  const length = 4;
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusNext = (index: number) => {
    if (index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const focusPrev = (index: number) => {
    if (index > 0) inputRefs.current[index - 1]?.focus();
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const digit = event.target.value.replace(/\D/g, "").slice(0, 1); // only 1 number
    setOTP((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit) focusNext(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = event;

    // Allow nav keys
    if (["Tab", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

    // Numeric keys allowed (handled by onChange)
    if (/^\d$/.test(key)) return;

    if (key === "Backspace") {
      event.preventDefault(); // we'll manage deletion + focus
      setOTP((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = ""; // clear current
        } else if (index > 0) {
          next[index - 1] = ""; // clear previous if current already empty
          // focus previous after state update
          setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
        }
        return next;
      });
      return;
    }

    // Block anything else
    event.preventDefault();
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    setOTP((prev) => {
      const next = [...prev];
      const chars = pasted.slice(0, length - index).split("");
      for (let i = 0; i < chars.length; i++) {
        next[index + i] = chars[i];
      }
      return next;
    });

    // focus the last filled input (or stay on the last)
    const lastFilled = Math.min(index + pasted.length - 1, length - 1);
    setTimeout(() => inputRefs.current[lastFilled]?.focus(), 0);
  };

  const disableOTPSubmitButton = () => {
    return otp.filter((item) => item != "").length !== length;
  };

  return (
    <div>
      OTPInput
      <div className="container">
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              inputMode="numeric"
              pattern="\\d*"
              maxLength={1}
              type="text"
              className="otp-input"
              aria-label={`OTP digit ${index + 1}`}
            />
          );
        })}
      </div>
      <button
        onClick={() => alert(otp.join(""))}
        disabled={disableOTPSubmitButton()}
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OTPInput;
