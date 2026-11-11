import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-merke-600 dark:text-merke-300">404</p>
      <h1 className="mt-4">{t("notFound.tittel")}</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("notFound.tekst")}
      </p>
      <Link to="/" className="knapp mt-8">
        {t("notFound.tilbake")}
      </Link>
    </div>
  );
};

export default NotFound;
