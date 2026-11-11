import { useTranslation } from "react-i18next";
// Enkel demo av HTML-skjema, der event-funksjoner
// for å håndtere inndata er sendt med fra en "superkomponent"
// (i dette tilfellet Butikk). Merk at samme event-funksjon lesInndata
// blir brukt for å håndtere endring både i brukernavn og passord,
// denne funksjonen må dermed sjekke event-objektet for å finne ut
// hvilken tekstboks som ble endret (se Butikk for koden).

const Innlogging = ({ sjekkInnlogging, lesInndata }) => {
  const { t } = useTranslation();
  return (
    <div className="kort max-w-xl">
      <form onSubmit={sjekkInnlogging} className="space-y-4">
        <div>
          <h2>{t("innlogging.tittel")}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("innlogging.ingress")}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            className="felt"
            id="brukernavn"
            name="brukernavn"
            placeholder={t("innlogging.brukernavn")}
            onChange={lesInndata}
          />
          <input
            type="password"
            className="felt"
            id="passord"
            name="passord"
            placeholder={t("innlogging.passord")}
            onChange={lesInndata}
          />
          <button className="knapp shrink-0">{t("innlogging.loggInn")}</button>
        </div>
      </form>
    </div>
  );
};

export default Innlogging;
