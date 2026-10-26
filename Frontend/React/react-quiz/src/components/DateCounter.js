import { useState, useReducer } from "react";

function countReducer(currentState, action) {
  console.log(currentState, action);
  switch (action.type) {
    case "dec":
      return {
        ...currentState,
        count: currentState.count - currentState.step,
      };

    case "inc":
      return {
        ...currentState,
        count: currentState.count + currentState.step,
      };

    case "setCount":
      return { ...currentState, count: action.payLoad };

    case "setStep":
      return { ...currentState, step: action.payLoad };

    case "reset":
      return { count: 0, step: 1 };

    default:
      throw new Error(" what is this bro");
  }
}

const initialState = { count: 0, step: 1 };
function DateCounter() {
  const [ini, dispatch] = useReducer(countReducer, initialState);

  console.log("hey ini", ini);
  const { count, step } = ini;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);

    dispatch({ type: "dec" });
    // setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "inc" });
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
