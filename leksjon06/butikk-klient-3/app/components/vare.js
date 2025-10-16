"use client";

import Grid from "@mui/material/Grid";

// Hver vare blir vist som et "kort" og presentert i et
// Grid-system ved hjelp av Material UI. Les mer om dette her:
// https://mui.com/components/grid/

const Vare = ({ vnr, betegnelse, pris }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <div className="boks">
        <h3>{betegnelse}</h3>
        <p>VNr: {vnr}</p>
        <p>Pris: {pris}</p>
      </div>
    </Grid>
  );
};

export default Vare;
