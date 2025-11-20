// Test av bcrypt-modulen i Node for kryptering av passord.
// Kilde: https://www.npmjs.com/package/bcrypt
// NB! På nettsiden er det anbefalt å bruke bcrypt.hash() og bcrypt.compare()
// i stedet for bcrypt.hashSync() og bcrypt.compareSync().

import bcrypt from "bcrypt";

// Paasordet brukeren skriver inn ved registrering
const password = "hemmelig";
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("Hashet passord: ", hashedPassword);
// Lagre i databasen sammen med brukeren

// Litt seinere ...

// Passordet som brukeren prøver å logge inn med
const inputPassword = "hemmelig";

// Les inn hashedPassword fra databasen.
let result = bcrypt.compareSync(inputPassword, hashedPassword);

// Prøv å endre inputPassword til feil passord
console.log("Riktig passord? ", result);
