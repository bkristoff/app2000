import Vare from "./Vare.jsx";

// Hver vare blir vist som et "kort" og presentert med grid-systemet til Tailwind.

const Vareliste = ({ varer }) => {
  return (
    <>
      <h2>Varer på lager</h2>
      <div className="grid grid-cols-4 gap-4">
        {varer.map((vare) => (
          <Vare
            key={vare.VNr}
            vnr={vare.VNr}
            betegnelse={vare.Betegnelse}
            pris={vare.Pris}
          />
        ))}
      </div>
    </>
  );
};

export default Vareliste;
