function kinopris(pris, alder) {
  if (alder <= 5) {
    pris = 0.0; // Gratis
  } else if (alder < 12 || alder >= 60) {
    pris = pris / 3.0; // Eh - halv pris?
  }
  return pris;
}

console.log(kinopris(80, 76));

export { kinopris };
