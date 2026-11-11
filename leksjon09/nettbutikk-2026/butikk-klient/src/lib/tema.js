import { createContext } from "react";

// En "context" er en måte å dele data med mange komponenter uten å sende
// dem som props gjennom alle mellomliggende komponenter ("prop drilling").
//
// Her deler vi hvilket tema som er valgt ("lys" eller "mørk") og en funksjon
// for å bytte tema. Verdien under er standardverdien, som bare brukes hvis
// en komponent ligger utenfor <TemaProvider> (se components/TemaProvider.jsx).
//
// Komponenter som trenger temaet, henter det med:
//   const { tema, byttTema } = useContext(TemaContext);

export const TemaContext = createContext({
  tema: "lys",
  byttTema: () => {},
});
