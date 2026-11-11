import Vare from "./Vare.jsx";
import { useTranslation } from "react-i18next";

// Hver vare blir vist som et "kort" og presentert med grid-systemet til Tailwind.
// Antall kolonner tilpasses skjermbredden (responsivt design):
// 1 kolonne på mobil, 2 fra sm, 3 fra md og 4 fra lg.

const Vareliste = ({ varer }) => {
  const { t } = useTranslation();
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2>{t("vareliste.tittel")}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {/* count gir automatisk entall/flertall: vareliste.antall_one / _other */}
          {t("vareliste.antall", { count: varer.length })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {varer.map((vare) => (
          <Vare
            key={vare.VNr}
            vnr={vare.VNr}
            betegnelse={vare.Betegnelse}
            pris={vare.Pris}
          />
        ))}
      </div>
    </section>
  );
};

export default Vareliste;
