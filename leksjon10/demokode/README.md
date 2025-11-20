# Demo-mappe om sikkerhet/hacking

Minieksempler som demonstrerer ulike teknikker/konsepter innen sikkerhet og tilstandsbevaring i webapplikasjoner.

## Installere

```
npm install
```

Start deretter de enkelte JS-filene med f.eks.:

```
node ./testCrypto.js
```

## testCrypto.js og testBCrypt.js

Den første (testCrypto.js) viser bruk av salt i krypteringsalgoritmer, mens testBCrypt.js viser bruk av et ferdig bibliotek for kryptering og sjekk av passord.

Uansett på sin plass med en advarsel: All kode her er ment for undervisningsbruk. Et godt råd er uansett å bruke anerkjente (og oppdaterte) biblioteker for å gjøre jobben med kryptering og autentisering.

## testSqlInjection.js

En demo av SQL injection. Skriver ut "farlig" SQL-kode som kan testes i MySQL Workbench (mot nettbutikken).

## testXSS.html og testXSS.js

En demo av Cross Site Scripting. JS-skriptet skriver ut effekten av XSS-angrep i konsollet og demonstrerer et mottiltak, HTML-filen viser effekten i nettleseren.

## testCookie.js

Demonstrerer bruk av cookies fra JavaScript. Start serveren med node ./testCookie.js

- Åpne http://localhost:3000/set-cookie i nettleseren for å sette cookie-verdien.
- Gå til http://localhost:3000/get-cookie for å se cookie-verdien.
- Gå til http://localhost:3000/delete-cookie for å slette cookien.

Prøv å avslutte nettleseren når cookie er satt og sjekk at den er der etter ny oppstart. Hvis du har satt opp nettleseren til å slette cookies ved stenging må du endre innstillinger (midlertidig) for å teste dette.

## testSession.js

Demonstrerer sessions i JavaScript. Start serveren med node ./testSession.js

- Åpne http://localhost:3000/set-session i nettleseren for å sette sesjonsvariabelen.
- Gå til http://localhost:3000/get-session for å se sesjonsvariabelen.
- Gå til http://localhost:3000/unset-session for å slette sesjonsvariabelen.

## webstorage.html og webstorage.js

Demonstrerer Web Storage. Åpne HTML-filen i nettleseren.
