import { useTranslation } from "react-i18next";
// Enkel demo av HTML-skjema, der event-funksjoner for å håndtere inndata
// er sendt med fra en "mor-komponent" (i dette tilfellet Butikk).
// Event-funksjonene lesVnr og lesAntall er altså definert i Butikk
// og sørger for at innholdet i disse tekstboksene blir tatt vare på
// i hooks-variabler. Event-funksjonen bestillVare er også definert
// i Butikk og håndterer submit-knappen (sjekker lovlig innlogging).

const Bestilling = ({ lesVnr, lesAntall, bestillVare }) => {
  const { t } = useTranslation();
  return (
    <div className="kort">
      <form onSubmit={bestillVare} className="space-y-4">
        <h2>{t("bestilling.tittel")}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            className="felt"
            name="vnr"
            placeholder={t("bestilling.vnr")}
            onChange={lesVnr}
          />
          <input
            type="text"
            className="felt sm:w-32"
            name="antall"
            inputMode="numeric"
            placeholder={t("bestilling.antall")}
            onChange={lesAntall}
          />
          <button className="knapp shrink-0">{t("bestilling.leggIKurv")}</button>
        </div>
      </form>
    </div>
  );
};

export default Bestilling;
