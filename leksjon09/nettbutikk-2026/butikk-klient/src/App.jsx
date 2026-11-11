import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hjem from "./pages/Hjem.jsx";
import Butikk from "./pages/Butikk.jsx";
import Om from "./pages/Om.jsx";
import Faq from "./pages/Faq.jsx";
import NotFound from "./pages/NotFound.jsx";
import Butikker from "./pages/Butikker.jsx";
import Layout from "./Layout.jsx";
import TemaProvider from "./components/TemaProvider.jsx";

// TemaProvider ligger ytterst, slik at alle komponenter inni
// kan hente temaet (lys/mørk) med useContext.
const App = () => {
  return (
    <TemaProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Hjem />} />
            <Route path="/butikk" element={<Butikk />} />
            <Route path="/om" element={<Om />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/butikker" element={<Butikker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </TemaProvider>
  );
};

export default App;
