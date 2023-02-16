import React, { useState } from "react";
interface ILang {
  lang: string;
  setLang: (lang: string) => void;
}
export const LangContext = React.createContext<ILang>({
  lang: "en",
  setLang: (language: string) => {},
});

const LangContextProvider = ({ children }: any) => {
  const [lang, setLang] = useState("en");

  const langHandler = (selectedLang: string) => {
    setLang(selectedLang);
  };

  return (
    <LangContext.Provider
      value={{
        lang: lang,
        setLang: langHandler,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
export default LangContextProvider;
