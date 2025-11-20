// Test av crypto-modulen i Node for kryptering av passord.

// NB! Dette er en enkel demo og ikke en måte jeg tør anbefale for å lagre passord på i produksjon.
// Sier ikke at den er feil, men det er mye som skal være på plass for å gjøre dette sikkert.
// Anbefaler å bruke et bibliotek som bcrypt eller argon2 for å lagre passord sikkert.

import crypto from "crypto";

// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);
}

function verifyPassword(inputPassword, hashedPassword, salt) {
  const inputHash = hashPassword(inputPassword, salt);
  return inputHash === hashedPassword;
}

const password = "hemmelig";
const salt = crypto.randomBytes(16);
const hashedPassword = hashPassword(password, salt);

console.log("Salt: ", salt.toString("hex"));
console.log("Hashet passord: ", hashedPassword);

const inputPassword = "hemmelig"; // Prøv å endre til feil passord
const hashedInputPassword = hashPassword(inputPassword, salt);

console.log("Hashet input passord: ", hashedInputPassword);

const isValid = verifyPassword(inputPassword, hashedPassword, salt);
console.log("Riktig passord? ", isValid);
