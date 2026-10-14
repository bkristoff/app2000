import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
