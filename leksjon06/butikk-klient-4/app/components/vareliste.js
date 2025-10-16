"use client";

import Grid from "@mui/material/Grid";
import Vare from "./vare.js";

// Visningen er basert på Grid-systemet til Material UI.

const Vareliste = ({ varer }) => {
  // Merk: React krever at alle elementer i en liste må ha et unikt key-attributt.
  return (
    <>
      <h2>Varer på lager</h2>
      <div>
        <Grid container spacing={2}>
          {varer.map((vare) => (
            <Vare
              key={vare.VNr}
              vnr={vare.VNr}
              betegnelse={vare.Betegnelse}
              pris={vare.Pris}
            />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Vareliste;
