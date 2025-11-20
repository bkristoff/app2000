// Demo av SQL injection

// Bruker skriver inn epost og passord i et HTML-skjema for å logge inn.
let txtEpost = "paaa@hh.no";
let txtPassord = "laap";

// SQL-spørringen som kjøres for å sjekke om brukeren finnes i databasen.
let query =
  "SELECT * FROM Kunde WHERE EPost = '" +
  txtEpost +
  "' and Passord = '" +
  txtPassord +
  "';";

// Test i MySQL Workbench => gir 1 rad fra Kunde-tabellen tilbake.
console.log(query);
// SELECT * FROM Kunde WHERE EPost = 'paaa@hh.no' and Passord = 'laap';

// Hacker skriver inn epost og passord i et HTML-skjema for å logge inn.
txtEpost = "' OR 1=1; -- ";
txtPassord = "";
query =
  "SELECT * FROM Kunde WHERE EPost = '" +
  txtEpost +
  "' and Passord = '" +
  txtPassord +
  "';";

// Test i MySQL Workbench => gir hele Kunde-tabellen tilbake.
console.log(query);
// SELECT * FROM Kunde WHERE EPost = '' OR 1=1; -- ' and Passord = '';

// Ny hacker:
txtEpost = "' OR 1=1; DROP TABLE A; -- ";
txtPassord = "";
query =
  "SELECT * FROM Kunde WHERE EPost = '" +
  txtEpost +
  "' and Passord = '" +
  txtPassord +
  "';";

// Opprett tabellen A i databasen først: CREATE TABLE A(B INT);
// Test i MySQL Workbench => gir hele tabellen tilbake + sletter tabellen A.
console.log(query);

let tall = "12a";
console.log("Et lovlig tall?", !isNaN(tall));
