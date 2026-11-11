import { useState } from "react";
import { TemaContext } from "../lib/tema.js";

// TemaProvider "eier" temaet: den tar vare på det med useState og gjør
// både verdien og en funksjon for å endre den tilgjengelig for alle
// komponenter som ligger inni den (children). Se App.jsx.
//
// Når tema endres, blir alle komponenter som bruker useContext(TemaContext)
// tegnet på nytt automatisk.
//
// Valgt tema lagres i localStorage, slik at det huskes når siden lastes
// på nytt. Se verdien i DevTools: Application -> Local Storage.

const TemaProvider = ({ children }) => {
  // Vi gir useState en funksjon i stedet for en verdi. Da leses
  // localStorage bare første gang komponenten vises, ikke ved hver
  // ny tegning. ?? gir "lys" hvis ingenting er lagret (getItem gir null).
  const [tema, setTema] = useState(() => localStorage.getItem("tema") ?? "lys");

  const byttTema = () => {
    const nyttTema = tema === "lys" ? "mørk" : "lys";
    setTema(nyttTema);
    localStorage.setItem("tema", nyttTema);
  };

  return (
    <TemaContext.Provider value={{ tema, byttTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export default TemaProvider;
