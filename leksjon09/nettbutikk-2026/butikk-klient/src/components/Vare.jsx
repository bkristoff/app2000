import { visBeløp } from "../lib/hjelpere.js";
import { useTranslation } from "react-i18next";

const Vare = ({ vnr, betegnelse, pris }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-sm leading-snug">{betegnelse}</h3>
      <div className="mt-4 flex items-end justify-between gap-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">{t("vare.vnr", { vnr })}</p>
        <p className="font-semibold text-merke-700 dark:text-merke-300">
          {visBeløp(pris)}
        </p>
      </div>
    </div>
  );
};

export default Vare;
