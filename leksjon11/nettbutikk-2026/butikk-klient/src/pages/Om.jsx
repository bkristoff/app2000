import { useTranslation } from "react-i18next";
const Om = () => {
  const { t } = useTranslation();
  return (
    <div className="kort max-w-3xl space-y-4">
      <h1>{t("om.tittel")}</h1>
      <p>{t("om.tekst")}</p>
    </div>
  );
};

export default Om;
