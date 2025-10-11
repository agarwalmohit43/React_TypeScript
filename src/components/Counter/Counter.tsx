import React, { useReducer } from "react";

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "Increment"; payload?: { value: number } }
  | { type: "Decrement"; payload?: { value: number } }
  | { type: "Reset" };

const initialValue: CounterState = {
  count: 0,
};

function counterReducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case "Increment": {
      return {
        count: action?.payload?.value
          ? state.count + action?.payload?.value
          : state.count + 1,
      };
    }
    case "Decrement": {
      const totalVal = action?.payload?.value
        ? state.count - action?.payload?.value
        : state.count - 1;
      return { count: totalVal > 0 ? totalVal : 0 };
    }
    case "Reset":
      return { ...initialValue };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialValue);
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "Increment", payload: { value: 1 } });
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.count > 0) {
      dispatch({ type: "Decrement", payload: { value: 1 } });
    } else {
      console.log("Counter value cannot be negative");
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "Reset" });
  };
  return (
    <div>
      <h1>Counter</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <strong>Counter: {state.count}</strong>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement} disabled={state.count === 0}>
            Decrement
          </button>
          <button onClick={handleReset} disabled={state.count === 0}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
