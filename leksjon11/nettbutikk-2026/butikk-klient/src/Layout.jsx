import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TemaContext } from "./lib/tema.js";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

// Felles ramme rundt alle sidene: meny øverst, innhold i midten og
// bunntekst nederst. flex-col + flex-1 sørger for at bunnteksten
// alltid ligger nederst, også når siden har lite innhold.
//
// Layout henter temaet fra TemaContext. Ved mørk modus får det ytterste
// elementet klassen "dark", og da slår alle Tailwind-klasser med
// prefikset dark: inn (f.eks. dark:bg-slate-900) i hele appen.
//
// Språkfilene lastes ned asynkront. Til de er på plass er ready false,
// og da viser vi ingenting - ellers ville brukeren et øyeblikk sett
// nøklene (f.eks. "nav.butikk") i stedet for tekstene.
const Layout = ({ children }) => {
  const { tema } = useContext(TemaContext);
  const { ready } = useTranslation();

  if (!ready) return null;

  return (
    <div className={tema === "mørk" ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-700 antialiased transition-colors dark:bg-slate-900 dark:text-slate-300">
        <NavBar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
