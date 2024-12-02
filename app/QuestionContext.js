import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [question, setQuestion] = useState("");

  return (
    <QuestionContext.Provider value={{ question, setQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
}
