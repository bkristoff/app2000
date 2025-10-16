"use client";

import Grid from "@mui/material/Grid";
import Vare from "../components/vare.js";

const Vareliste = ({ varer }) => {
  return (
    <>
      <h2>Varer på lager</h2>
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
    </>
  );
};

export default Vareliste;
