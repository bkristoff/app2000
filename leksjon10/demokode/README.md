# Demo-mappe om sikkerhet/hacking

Små eksempler som viser ulike teknikker og konsepter innen sikkerhet og tilstandsbevaring i webapplikasjoner.

All kode her er laget for undervisning. Et godt råd uansett: bruk anerkjente (og oppdaterte) biblioteker til kryptering og autentisering.

## Installere

Krever Node 22 eller nyere.

```
npm install
```

Noen av demoene leser innstillinger fra en `.env`-fil. Kopier eksempelfilen:

```
cp .env.example .env
```

Bytt deretter ut `SESSION_SECRET` med en tilfeldig verdi. `.env` skal aldri sjekkes inn i Git.

Hver demo har et eget npm-script, for eksempel:

```
npm run crypto
```

| Script                       | Fil                 |
| ---------------------------- | ------------------- |
| `npm run crypto`             | testCrypto.js       |
| `npm run bcrypt`             | testBCrypt.js       |
| `npm run sql`                | testSqlInjection.js |
| `npm run sql-param`          | testSqlParam.js     |
| `npm run xss`                | testXSS.js          |
| `npm run cookie`             | testCookie.js       |
| `npm run session`            | testSession.js      |
| `npm run csrf [-- none\|strict]` | testCsrf.js     |

HTML-filene åpner du direkte i nettleseren.

## testCrypto.js og testBCrypt.js

testCrypto.js viser hashing av passord med salt og mange iterasjoner (PBKDF2) i Nodes innebygde `crypto`-modul. Den viser også hvorfor man bør sammenligne hasher med `timingSafeEqual` og ikke med `===`.

testBCrypt.js gjør det samme med biblioteket bcrypt, som tar seg av salt og lagringsformat for deg. Det er dette du bør bruke i praksis (eller argon2).

## testSqlInjection.js og testSqlParam.js

testSqlInjection.js viser SQL injection. Den skriver ut "farlig" SQL-kode som kan testes i MySQL Workbench mot nettbutikk-databasen.

testSqlParam.js viser mottiltaket: parametriserte spørringer med `?` i mysql2. Del 1 kjører uten database. Del 2 kobler til nettbutikk-databasen og viser at samme angrep gir 0 rader med `execute()`, men hele tabellen med strengkonkatenering. Den bruker samme innstillinger som butikk-tjener, og du kan overstyre dem med `DB_*` i `.env`.

## testXSS.html, testXSS.js og testXSSReact.html

Demoer av Cross Site Scripting (XSS):

- testXSS.js skriver ut effekten av XSS-angrep i konsollet og viser et mottiltak med biblioteket xss.
- testXSS.html viser effekten i nettleseren.
- testXSSReact.html viser XSS i React. Vanlig JSX (`{tekst}`) er trygt, `dangerouslySetInnerHTML` er farlig, og DOMPurify er løsningen hvis du må vise HTML fra brukere. Siden henter React fra CDN, så den krever internett, men ikke noe byggesteg.

## testCookie.js

Viser bruk av cookies i Express. Start serveren med `npm run cookie`.

- Åpne http://localhost:3000/set-cookie i nettleseren for å sette en vanlig cookie.
- Åpne http://localhost:3000/set-secure-cookie for å sette en cookie med `httpOnly`, `secure` og `sameSite`.
- Gå til http://localhost:3000/get-cookie for å se verdiene.
- Skriv `document.cookie` i konsollet i nettleseren. Bare den vanlige cookien vises, fordi `httpOnly` skjuler den andre for JavaScript.
- Gå til http://localhost:3000/delete-cookie for å slette cookiene.

Prøv å avslutte nettleseren mens cookien er satt, og sjekk at den fortsatt er der etter ny oppstart. Hvis nettleseren er satt opp til å slette cookies ved lukking, må du endre innstillingen (midlertidig) for å teste dette.

## testSession.js

Viser sessions i Express. Krever `SESSION_SECRET` i `.env`. Start serveren med `npm run session`.

- Åpne http://localhost:3000/set-session i nettleseren for å sette sesjonsvariabelen.
- Gå til http://localhost:3000/get-session for å se sesjonsvariabelen.
- Gå til http://localhost:3000/unset-session for å slette sesjonsvariabelen.
- Gå til http://localhost:3000/destroy-session for å slette hele sesjonen (slik man gjør ved utlogging).

## testCsrf.js

Viser CSRF (Cross-Site Request Forgery) og to mottiltak: SameSite-cookies og CSRF-token. Programmet starter en "nettbank" på http://localhost:3000 og en "ondsinnet side" på http://127.0.0.1:4000. Nettleseren regner `localhost` og `127.0.0.1` som to ulike nettsteder.

1. Start med `npm run csrf -- none`. Sesjons-cookien får da `SameSite=None` og sendes med fra alle nettsteder.
2. Logg inn i nettbanken på http://localhost:3000.
3. Gå til http://127.0.0.1:4000 og klikk på begge knappene.
   - Angrepet mot `/overfor` virker. Nettleseren sender med bankens cookie, og banken tror at det er brukeren som overfører penger.
   - Angrepet mot `/overfor-sikker` stoppes, fordi angriperen ikke kjenner CSRF-tokenet.
4. Stopp serveren og start på nytt med `npm run csrf` (standard er `SameSite=Lax`). Logg inn på nytt og gjenta angrepet. Nå stoppes begge angrepene, fordi nettleseren ikke sender cookien med på POST-forespørsler fra et annet nettsted.

Følg med i terminalen. Banken logger hva som skjer og hvilken `Origin`-header forespørselen hadde.

## webstorage.html og webstorage.js

Viser Web Storage (`sessionStorage` og `localStorage`). Åpne HTML-filen i nettleseren.

Koden bruker `textContent` og ikke `innerHTML`. Prøv å bytte til `innerHTML` og lagre verdien `<img src=x onerror="alert('XSS')">`, så ser du hvorfor.
