import logo from "../assets/logo.JPG";

const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-stone-500">
        <img src={logo} alt="Firma logo" className="h-12 w-auto" />
        <p>Kontakt oss.</p>
      </div>
    </footer>
  );
};

export default Footer;
