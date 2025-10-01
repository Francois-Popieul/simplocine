import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language } from "./types";

export const LanguageContext = createContext<LanguageContext | null>(null);

interface LanguageContextProviderProps {
  children: ReactNode;
}

interface LanguageContext {
  selectedLanguage: Language | null;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language | null>>;
}

export default function LanguageContextProvider({
  children,
}: LanguageContextProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>({
    name: "en-US",
  });

  const languageContextValues: LanguageContext = {
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <LanguageContext.Provider value={languageContextValues}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    // Erreur déclenchée si un élément qui utilise le contexte est instancié en dehors de celui-ci
    throw new Error(
      "L'élément qui consomme LanguageContext doit se trouver dans LanguageContext"
    );
  }

  return context;
};
