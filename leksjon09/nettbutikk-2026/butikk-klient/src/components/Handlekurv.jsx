import { useState } from "react";
import { lagreOrdre } from "../lib/api.js";
import { visBeløp } from "../lib/hjelpere.js";
import { useTranslation } from "react-i18next";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.
//
// Ordren lagres direkte i event-funksjonen gåTilKasse, ikke i en useEffect.
// Tommelfingerregel: Kode som skal kjøres fordi brukeren gjorde noe
// (klikket på en knapp), hører hjemme i event-funksjonen. useEffect er for
// å synkronisere med noe utenfor React når komponenten vises (se Butikk).
// Les mer: https://react.dev/learn/you-might-not-need-an-effect

const Handlekurv = ({ brukernavn, kurv, tømKurv }) => {
  const { t } = useTranslation();
  const [melding, setMelding] = useState("");
  const [lagrer, setLagrer] = useState(false);

  // Finn samlet verdi av handlekurven
  const handlekurvTotal = () => {
    return kurv.reduce((sum, elem) => sum + elem.pris * elem.antall, 0);
  };

  const gåTilKasse = async () => {
    setLagrer(true);
    setMelding(t("handlekurv.lagrer"));
    try {
      const svar = await lagreOrdre(brukernavn, kurv);
      setMelding(t("handlekurv.lagret", { ordrenr: svar.ordrenr }));
      tømKurv();
    } catch (error) {
      setMelding(t("handlekurv.feil", { melding: error.message }));
    } finally {
      setLagrer(false);
    }
  };

  return (
    <div className="kort flex flex-col gap-4">
      <h2>{t("handlekurv.tittel", { brukernavn })}</h2>
      <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-700">
        {kurv.map((linje) => (
          <li key={linje.vnr} className="flex justify-between gap-4 py-2">
            <span>
              {t("handlekurv.linje", {
                antall: linje.antall,
                vnr: linje.vnr,
                pris: visBeløp(linje.pris),
              })}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {visBeløp(linje.antall * linje.pris)}
            </span>
          </li>
        ))}
      </ul>
      <p className="flex justify-between border-t border-slate-200 pt-3 font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100">
        <span>{t("handlekurv.total")}</span>
        <span>{visBeløp(handlekurvTotal())}</span>
      </p>
      <button
        onClick={gåTilKasse}
        disabled={lagrer || kurv.length === 0}
        className="knapp">
        {t("handlekurv.tilKasse")}
      </button>
      {melding && (
        <p className="rounded-lg bg-merke-50 px-3 py-2 text-sm text-merke-900 dark:bg-slate-700 dark:text-slate-100">
          {melding}
        </p>
      )}
    </div>
  );
};

export default Handlekurv;
