import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation("translation");

  return (
    <div>
      <h1>i18n-demo</h1>
      <p>{t("Welcome")}</p>
      <button onClick={() => i18n.changeLanguage("no")}>Bytt til norsk</button>
    </div>
  );
}

export default App;
