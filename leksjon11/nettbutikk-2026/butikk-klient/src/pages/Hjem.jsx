import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hjem = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-merke-600 to-merke-900 px-6 py-16 text-center text-white shadow-lg sm:px-12">
        <h1 className="text-4xl text-white sm:text-5xl">{t("hjem.tittel")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-merke-100">
          {t("hjem.ingress")}
        </p>
        <Link
          to="/butikk"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-merke-700 shadow transition hover:bg-merke-50">
          {t("hjem.tilButikken")}
        </Link>
      </section>
    </div>
  );
};

export default Hjem;
