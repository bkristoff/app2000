import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
