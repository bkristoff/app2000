import { Link, NavLink } from "react-router";

// NavLink fungerer som Link, men vet om lenken peker til siden vi står på,
// slik at vi kan markere den aktive menylenken.
const lenkeStil = ({ isActive }) =>
  "rounded-md px-3 py-2 text-sm font-medium transition-colors " +
  (isActive
    ? "bg-emerald-700 text-white"
    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900");

const NavBar = () => {
  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-tight text-emerald-800">
          Hobbyhuset
        </Link>
        <div className="flex gap-1">
          <NavLink to="/" end className={lenkeStil}>
            Hjem
          </NavLink>
          <NavLink to="/butikk" className={lenkeStil}>
            Butikk
          </NavLink>
          <NavLink to="/om" className={lenkeStil}>
            Om
          </NavLink>
          <NavLink to="/faq" className={lenkeStil}>
            FAQ
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
