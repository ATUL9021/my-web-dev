"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();
function ReservationContext({ children }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  function resetRange() {
    setRange({ from: undefined, to: undefined });
  }
  return (
    <Context.Provider value={{ range, setRange, resetRange }}>
      {children}
    </Context.Provider>
  );
}

export function useReservation() {
  return useContext(Context);
}

export default ReservationContext;
