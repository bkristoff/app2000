import "./globals.css";
import NavBar from "./components/nav-bar.js";
import Footer from "./components/footer.js";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
