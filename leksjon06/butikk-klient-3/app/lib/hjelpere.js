var formatter = new Intl.NumberFormat("NO", {
  style: "currency",
  currency: "NOK",
});

const visBeløp = (pris) => formatter.format(pris);

export { visBeløp };
