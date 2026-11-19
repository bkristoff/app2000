// Demo av SQL injection
// Se testSqlParam.js for hvordan man beskytter seg (parametriserte spørringer).

// Bruker skriver inn epost og passord i et HTML-skjema for å logge inn.
let txtEpost = "paaa@hh.no";
let txtPassord = "laap";

// SQL-spørringen settes sammen med strengkonkatenering. DETTE ER FARLIG!
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
// En innloggingsrutine som sjekker "fikk vi minst én rad?" slipper hackeren inn.
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

// NB! Fra Node med mysql2 vil DROP TABLE-varianten normalt IKKE virke, fordi mysql2
// som standard ikke tillater flere SQL-setninger i én spørring (multipleStatements: false).
// Variant 2 (OR 1=1) virker derimot fint – så strengkonkatenering er farlig uansett.

// Bonus: Validering av input er et ekstra forsvar (ikke en erstatning for
// parametriserte spørringer). Forventer vi et tall, f.eks. et varenummer fra URL-en,
// kan vi sjekke at det faktisk ER et tall før vi bruker det:
const varenr = "12a";
console.log(`Er "${varenr}" et lovlig tall?`, !isNaN(varenr)); // false
console.log(`Er "12" et lovlig tall?`, !isNaN("12")); // true
// Pass på: isNaN("") og isNaN(" ") gir false (tom streng tolkes som 0).
// Strengere sjekk av heltall: /^\d+$/.test(varenr)
