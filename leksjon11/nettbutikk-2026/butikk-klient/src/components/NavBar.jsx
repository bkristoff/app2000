import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TemaContext } from "../lib/tema.js";

// NavLink fungerer som Link, men vet om lenken peker til siden vi står på.
// Da kan vi gi aktiv lenke en egen stil via funksjonen i className.
const lenkeStil = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-merke-50 text-merke-700 dark:bg-slate-800 dark:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

const ikonKnapp =
  "rounded-md px-3 py-2 leading-none transition hover:bg-slate-100 dark:hover:bg-slate-800";

const NavBar = () => {
  // Henter tema og byttTema fra TemaContext - uten props!
  const { tema, byttTema } = useContext(TemaContext);

  // useTranslation gir oss funksjonen t (oversett) og i18n-objektet.
  // Komponenten tegnes automatisk på nytt når språket byttes.
  const { t, i18n } = useTranslation();
  const byttSpråk = () =>
    i18n.changeLanguage(i18n.language === "no" ? "en" : "no");

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-merke-700 dark:text-merke-300">
          Hobbyhuset
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={lenkeStil}>
            {t("nav.hjem")}
          </NavLink>
          <NavLink to="/butikk" className={lenkeStil}>
            {t("nav.butikk")}
          </NavLink>
          <NavLink to="/om" className={lenkeStil}>
            {t("nav.om")}
          </NavLink>
          <NavLink to="/faq" className={lenkeStil}>
            {t("nav.faq")}
          </NavLink>
          {/* Knappen viser språket man bytter TIL */}
          <button
            onClick={byttSpråk}
            aria-label={t("nav.byttSpråk")}
            title={t("nav.byttSpråk")}
            className={`ml-2 text-sm font-semibold text-slate-600 dark:text-slate-300 ${ikonKnapp}`}>
            {i18n.language === "no" ? "EN" : "NO"}
          </button>
          <button
            onClick={byttTema}
            aria-label={tema === "lys" ? t("nav.byttTilMørk") : t("nav.byttTilLys")}
            title={tema === "lys" ? t("nav.mørkModus") : t("nav.lysModus")}
            className={`text-lg ${ikonKnapp}`}>
            {tema === "lys" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
