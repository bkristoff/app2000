// Et eksempel på en hjelpefunksjon vi trenger i flere komponenter.

// Presentasjon av beløp i norske kroner
var formatter = new Intl.NumberFormat("NO", {
  style: "currency",
  currency: "NOK",
});

const prisInklMva = (p) => p * 1.25;

const visBeløp = (pris) => formatter.format(prisInklMva(pris));

export { visBeløp };
