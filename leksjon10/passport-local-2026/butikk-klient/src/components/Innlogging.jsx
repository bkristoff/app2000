import { useTranslation } from "react-i18next";
// Enkel demo av HTML-skjema, der event-funksjoner
// for å håndtere inndata er sendt med fra en "superkomponent"
// (i dette tilfellet Butikk). Merk at samme event-funksjon lesInndata
// blir brukt for å håndtere endring både i e-post og passord,
// denne funksjonen må dermed sjekke event-objektet for å finne ut
// hvilken tekstboks som ble endret (se Butikk for koden).
//
// autoComplete-attributtene hjelper nettleserens passordhåndterer med å
// fylle inn (og foreslå) riktige verdier.

const Innlogging = ({ sjekkInnlogging, lesInndata, passord, visRegistrering }) => {
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
            type="email"
            className="felt"
            id="epost"
            name="epost"
            autoComplete="username"
            required
            placeholder={t("innlogging.epost")}
            onChange={lesInndata}
          />
          <input
            type="password"
            className="felt"
            id="passord"
            name="passord"
            autoComplete="current-password"
            required
            placeholder={t("innlogging.passord")}
            value={passord}
            onChange={lesInndata}
          />
          <button className="knapp shrink-0">{t("innlogging.loggInn")}</button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("innlogging.nyKunde")}{" "}
          <button
            type="button"
            onClick={visRegistrering}
            className="font-medium text-merke-700 underline dark:text-merke-300">
            {t("innlogging.registrerDeg")}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Innlogging;
