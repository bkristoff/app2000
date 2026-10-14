import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar">
      <p>
        <Link to="/">Hjem</Link> &nbsp;&#9734;&nbsp;
        <Link to="/butikk">Butikk</Link> &nbsp;&#9734;&nbsp;
        <Link to="/om">Om</Link> &nbsp;&#9734;&nbsp;
        <Link to="/faq">FAQ</Link>
      </p>
    </nav>
  );
};

export default NavBar;
