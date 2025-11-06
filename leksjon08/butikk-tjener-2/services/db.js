// Hardkoder varelageret
let varer = [
  {
    VNr: "10820",
    Betegnelse: "Dukkehår, hvitt",
    Pris: "53.50",
    KatNr: 13,
    Antall: 106,
    Hylle: "E12",
    Slettet: 0,
    Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
  },
  {
    VNr: "10822",
    Betegnelse: "Dukkehår, lys brunt",
    Pris: "53.50",
    KatNr: 13,
    Antall: 0,
    Hylle: "E12",
    Slettet: 0,
    Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
  },
  {
    VNr: "10830",
    Betegnelse: "Nisseskjegg, 30 cm",
    Pris: "66.50",
    KatNr: 13,
    Antall: 42,
    Hylle: "",
    Slettet: 0,
    Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
  },
];

const hentVarer = () => {
  console.log("hentVarer");
  return [varer, null];
};

const hentVare = (VNr) => {
  console.log("hentVare");
  return [varer[0], null];
};

const settInnVare = (vare) => {
  console.log("settInnVare");
};

const oppdaterVare = (vare) => {
  console.log("oppdaterVare");
};

const slettVare = (VNr) => {
  console.log("slettVare");
};

export { hentVarer, hentVare, settInnVare, oppdaterVare, slettVare };
