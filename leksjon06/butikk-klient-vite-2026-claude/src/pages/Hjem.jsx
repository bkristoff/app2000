import { Link } from "react-router";

const Hjem = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-emerald-800 px-8 py-14 text-white shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Velkommen til Hobbyhuset
        </h2>
        <p className="mt-4 max-w-xl text-lg text-emerald-50">
          Dette er landingsiden med demo-bruk av Tailwind.
        </p>
        <Link
          to="/butikk"
          className="mt-8 inline-block rounded-lg bg-white px-5 py-2.5 font-medium text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50">
          Gå til butikken
        </Link>
      </section>
    </div>
  );
};

export default Hjem;
