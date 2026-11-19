import { useState } from "react";
import { useTranslation } from "react-i18next";
import { registrer } from "../lib/api.js";

// Skjema for å registrere en ny kunde (POST /registrering).
//
// I motsetning til Innlogging holder denne komponenten selv på skjemadataene,
// i ett objekt i stedet for én useState per felt. Feltnavnene (name) er de samme
// som nøklene i objektet, så én event-funksjon (lesFelt) håndterer alle feltene.
//
// Tjeneren hasher passordet med bcrypt og logger inn den nye kunden (Passport).
// Skjemaet sjekker noen ting selv (required, minLength, pattern), men det er bare
// for brukervennlighetens skyld: tjeneren validerer alltid på nytt.

const tomtSkjema = {
  fornavn: "",
  etternavn: "",
  epost: "",
  passord: "",
  adresse: "",
  postnr: "",
};

const Registrering = ({ registrert, avbryt }) => {
  const { t } = useTranslation();
  const [skjema, setSkjema] = useState(tomtSkjema);
  const [feilmelding, setFeilmelding] = useState("");
  const [sender, setSender] = useState(false);

  const lesFelt = (event) => {
    setSkjema({ ...skjema, [event.target.name]: event.target.value });
  };

  const sendSkjema = async (event) => {
    event.preventDefault();
    setSender(true);
    try {
      const bruker = await registrer(skjema);
      registrert(bruker);
    } catch (error) {
      setFeilmelding(error.message);
    } finally {
      setSender(false);
    }
  };

  // Hjelpefunksjon som lager ett input-felt
  const felt = (name, type, autoComplete, ekstra = {}) => (
    <input
      type={type}
      className="felt"
      name={name}
      autoComplete={autoComplete}
      required
      placeholder={t(`registrering.${name}`)}
      value={skjema[name]}
      onChange={lesFelt}
      {...ekstra}
    />
  );

  return (
    <div className="kort max-w-xl">
      <form onSubmit={sendSkjema} className="space-y-4">
        <h2>{t("registrering.tittel")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {felt("fornavn", "text", "given-name")}
          {felt("etternavn", "text", "family-name")}
          {felt("epost", "email", "username")}
          {felt("passord", "password", "new-password", { minLength: 8 })}
          {felt("adresse", "text", "street-address")}
          {felt("postnr", "text", "postal-code", {
            pattern: "\\d{4}",
            inputMode: "numeric",
            maxLength: 4,
          })}
        </div>
        {feilmelding && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-300">
            {feilmelding}
          </p>
        )}
        <div className="flex gap-3">
          <button className="knapp" disabled={sender}>
            {t("registrering.registrer")}
          </button>
          <button
            type="button"
            onClick={avbryt}
            className="text-sm text-slate-600 underline dark:text-slate-300">
            {t("registrering.avbryt")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registrering;
