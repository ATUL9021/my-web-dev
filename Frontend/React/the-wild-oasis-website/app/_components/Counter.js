"use client";

import { useState } from "react";

function Counter() {
  const [count, setCounter] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={(e) => {
          setCounter(count + 1);
        }}
      >
        increase me
      </button>
    </div>
  );
}

export default Counter;
