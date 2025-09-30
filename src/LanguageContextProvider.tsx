import { createContext, useState, type ReactNode } from "react";
import type { Language } from "./types";

export const LanguageContext = createContext<Language | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export default function LanguageContextProvider({ children }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const contextValues = {
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValues}>
      {children}
    </LanguageContext.Provider>
  );
}
