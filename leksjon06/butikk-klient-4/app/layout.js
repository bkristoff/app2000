import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/nav-bar.js";
import Footer from "./components/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hobbyhuset",
  description: "En enkel nettbutikk laget med React og Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
