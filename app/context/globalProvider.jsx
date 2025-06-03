'use client';
import React from "react";
import FunctContProvider from "./Functional Context/provider";

function GlobalProvider({ children }) {
  return (
    <FunctContProvider>
        {children}
    </FunctContProvider>
  )
}

export default GlobalProvider;