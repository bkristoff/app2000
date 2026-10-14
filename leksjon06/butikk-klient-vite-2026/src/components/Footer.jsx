import logo from "../assets/logo.JPG";

const Footer = () => {
  return (
    <div className="space-y-4">
      <p>Kontakt oss.</p>
      <img src={logo} alt="Firma logo" className="mx-auto h-12 w-auto" />
    </div>
  );
};

export default Footer;
