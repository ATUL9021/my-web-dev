import { useEffect, useState } from "react";
export default function Timer({ dispatch, seconds }) {
  const [mySeconds, set] = useState(seconds);
  const min = Math.floor(mySeconds / 60);
  const sec = mySeconds % 60;
  useEffect(
    function () {
      const setTimer = setInterval(function () {
        set(mySeconds - 1);

        if (mySeconds === 0) {
          dispatch({ type: "timeOut" });
        }
      }, 1000);

      return function () {
        clearInterval(setTimer);
      };
    },
    [mySeconds, dispatch],
  );
  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{}
      {sec < 10 ? "0" : ""}
      {sec}{" "}
    </div>
  );
}
