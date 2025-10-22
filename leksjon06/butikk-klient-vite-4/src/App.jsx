import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hjem from "./pages/Hjem.jsx";
import Butikk from "./pages/Butikk.jsx";
import Om from "./pages/Om.jsx";
import Faq from "./pages/Faq.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./Layout.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hjem />} />
          <Route path="/butikk" element={<Butikk />} />
          <Route path="/om" element={<Om />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
