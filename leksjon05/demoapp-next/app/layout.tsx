import "./globals.css";
import type { ReactNode } from "react";
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
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
