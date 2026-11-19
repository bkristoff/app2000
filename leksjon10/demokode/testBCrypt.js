// Test av bcrypt-modulen i Node for hashing av passord.
// Kilde: https://www.npmjs.com/package/bcrypt
// Vi bruker de asynkrone funksjonene bcrypt.hash() og bcrypt.compare() med await.
// (De synkrone variantene hashSync()/compareSync() blokkerer serveren mens de regner,
// og hashing av passord er MED VILJE tregt.)

import bcrypt from "bcrypt";

// Passordet brukeren skriver inn ved registrering
const password = "hemmelig";
// "Cost factor": 2^10 runder. Høyere tall = tregere = vanskeligere å knekke.
const saltRounds = 10;

// bcrypt lager selv et tilfeldig salt og legger det inn i den ferdige strengen.
const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log("Hashet passord: ", hashedPassword);
// Format: $2b$10$<22 tegn salt><31 tegn hash>
// Lagre hele strengen i databasen sammen med brukeren.

// Litt seinere ...

// Passordet som brukeren prøver å logge inn med
const inputPassword = "hemmelig"; // Prøv å endre til feil passord

// Les inn hashedPassword fra databasen og sammenlign.
const result = await bcrypt.compare(inputPassword, hashedPassword);
console.log("Riktig passord? ", result);

// Kjør programmet flere ganger: hashen blir ulik hver gang (nytt salt),
// men compare() gir likevel riktig svar.
