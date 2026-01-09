import bcrypt from "bcrypt";

const knr = 5002;
const passord = "laap";
const passwordHash = await bcrypt.hash(passord, 10);
console.log(
  "UPDATE Kunde SET passord = '" + passwordHash + "' WHERE KNr = " + knr + ";"
);
