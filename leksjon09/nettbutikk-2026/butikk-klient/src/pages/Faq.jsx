import { useTranslation } from "react-i18next";
const Faq = () => {
  const { t } = useTranslation();
  return (
    <div className="kort max-w-3xl space-y-4">
      <h1>{t("faq.tittel")}</h1>
      <p>{t("faq.tekst")}</p>
    </div>
  );
};

export default Faq;
