// Test av crypto-modulen i Node for hashing av passord.

// NB! Dette er en enkel demo og ikke en måte jeg tør anbefale for å lagre passord på i produksjon.
// Sier ikke at den er feil, men det er mye som skal være på plass for å gjøre dette sikkert.
// Anbefaler å bruke et bibliotek som bcrypt eller argon2 for å lagre passord sikkert.

import crypto from "crypto";

// Antall iterasjoner gjør hashingen med vilje treg, slik at det blir dyrt å prøve
// mange passord (brute force). OWASP anbefaler (2023) 210 000 for PBKDF2-HMAC-SHA512.
// Prøv å endre tallet og se hvor lang tid det tar.
const ITERASJONER = 210_000;

// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITERASJONER, 64, "sha512").toString("hex");
}

function verifyPassword(inputPassword, hashedPassword, salt) {
  const inputHash = Buffer.from(hashPassword(inputPassword, salt), "hex");
  const lagretHash = Buffer.from(hashedPassword, "hex");
  // Ikke bruk === for å sammenligne hasher! === avbryter ved første ulike tegn,
  // og tidsforskjellen kan i teorien lekke informasjon (timing-angrep).
  // timingSafeEqual bruker alltid like lang tid.
  return (
    inputHash.length === lagretHash.length &&
    crypto.timingSafeEqual(inputHash, lagretHash)
  );
}

const password = "hemmelig";
const salt = crypto.randomBytes(16); // Nytt tilfeldig salt for hver bruker
console.time("Tid for én hashing");
const hashedPassword = hashPassword(password, salt);
console.timeEnd("Tid for én hashing");

// Salt og hash lagres begge i databasen.
console.log("Salt: ", salt.toString("hex"));
console.log("Hashet passord: ", hashedPassword);

const inputPassword = "hemmelig"; // Prøv å endre til feil passord
console.log("Hashet input passord: ", hashPassword(inputPassword, salt));

const isValid = verifyPassword(inputPassword, hashedPassword, salt);
console.log("Riktig passord? ", isValid);
