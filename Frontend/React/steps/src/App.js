import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  let [step, updateState] = useState(0);
  let arr = useState(true);
  let [isOpen, updateIsOpen] = arr;
  console.log(arr);

  function closeIsClicked() {
    updateIsOpen(!isOpen);
  }

  function increaseStep() {
    if (step === 2) return;
    updateState(step + 1);
  }

  function decreaseStep() {
    if (step === 0) return step;
    updateState(step - 1);
  }
  return (
    <React.Fragment>
      <button className="close" onClick={closeIsClicked}>
        &times;
      </button>
      {isOpen && (
        <div className="steps ">
          <div className="numbers">
            <div className={`${step >= 0 ? "active" : ""} `}>1</div>
            <div className={`${step >= 1 ? "active" : ""} `}>2</div>
            <div className={`${step >= 2 ? "active" : ""} `}>3</div>
          </div>
          <p className="message">{messages[step]}</p>
          <div className="buttons">
            <button
              onClick={decreaseStep}
              style={{ backgroundColor: "blue", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={increaseStep}
              style={{ backgroundColor: "blue", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
