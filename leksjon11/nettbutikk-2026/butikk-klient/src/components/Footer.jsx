import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.JPG";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p>{t("footer.kontakt")}</p>
          {/* Lenke til kartsiden med de fysiske butikkene */}
          <Link
            to="/butikker"
            className="font-medium text-merke-700 hover:underline dark:text-merke-300">
            📍 {t("footer.butikker")}
          </Link>
        </div>
        <img src={logo} alt={t("footer.logo")} className="h-10 w-auto" />
      </div>
    </footer>
  );
};

export default Footer;
