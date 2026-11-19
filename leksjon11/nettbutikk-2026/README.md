# Nettbutikk (fullstack)

Vi kombinerer butikk-klient-4 (Vite-varianten) fra leksjon 6 med butikk-tjener-3 med database (MySQL-varianten) fra leksjon 8.

Utvidelsen blir å koble klienten til tjeneren med Fetch API:

- Hente varedata fra databasen med useEffect.
- Sjekke innlogging mot Kunde-tabellen.
- Lagre handlekurven som en ny ordre (med transaksjon i databasen).

## Monorepo (leksjon 11)

Klienten og tjeneren ligger nå i samme Git-repo, et såkalt **monorepo**. Rotmappen (denne mappen) har sin egen `package.json` som binder de to delene sammen med [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces):

```
nettbutikk-2026/
├── package.json          ← workspaces + felles skript (dev, build, start, test)
├── package-lock.json     ← én lockfil for hele repoet
├── node_modules/         ← felles for klient og tjener
├── Procfile              ← forteller Heroku hvordan appen startes
├── .github/workflows/    ← GitHub Actions: kjører testene ved hver push
├── playwright.config.js  ← oppsett for ende-til-ende-testene
├── e2e/                  ← ende-til-ende-tester (Playwright)
├── butikk-klient/        ← React + Vite
└── butikk-tjener/        ← Express + Passport + MySQL
    └── test/             ← API-tester (Mocha + Supertest)
```

### Kom i gang lokalt

Sørg for at MySQL kjører og at databasen er satt opp (se README i `butikk-tjener`). Kjør deretter alt fra **rotmappen**:

```
npm install
npm run dev
```

- `npm install` installerer pakkene til både klienten og tjeneren.
- `npm run dev` starter tjeneren (port 3030) og klienten (port 5173) samtidig i samme terminalvindu, ved hjelp av pakken `concurrently`.
- Åpne http://localhost:5173.

Skriptene i rotmappen:

| Skript | Hva |
| --- | --- |
| `npm run dev` | Utvikling: tjener (3030) og Vite-klient (5173) samtidig |
| `npm run build` | Bygger React-klienten til `butikk-klient/dist` |
| `npm start` | Starter Express-tjeneren. Finnes `dist`, leverer den også klienten |
| `npm test` | API-testene (Mocha + Supertest) |
| `npm run test:e2e` | Ende-til-ende-testene (Playwright) |
| `npm run test:e2e:ui` | Samme, men i Playwrights grafiske UI-modus |

Du kan fortsatt kjøre skript i én av delene, enten med `cd butikk-tjener` og `npm start`, eller fra rotmappen med `npm start -w butikk-tjener` (`-w` = workspace).

### Én app i produksjon

Under utvikling kjører klienten og tjeneren på hver sin port. I produksjon gjør vi det enklere:

1. `npm run build` gjør React-koden om til vanlige HTML-, CSS- og JavaScript-filer i `butikk-klient/dist`.
2. Express leverer disse filene med `express.static` (se `butikk-tjener/app.js`), i tillegg til REST API-et.

Klienten og API-et får dermed **samme adresse**. Det gir tre fordeler:

- Vi trenger bare én Heroku-app.
- CORS er ikke lenger i bruk.
- Sesjons-cookien virker uten ekstra oppsett, fordi den ikke sendes på tvers av domener.

I `butikk-klient/src/lib/api.js` blir `API_URL` derfor tom i produksjon, slik at klienten kaller `/varer` i stedet for `http://localhost:3030/varer`.

Én detalj må til for at React Router skal fungere: Hvis brukeren åpner http://.../butikk direkte eller trykker F5, finnes det ingen fil som heter `butikk`. Tjeneren svarer da med `index.html`, og React Router viser riktig side. Se kommentarene i `app.js`.

Prøv selv lokalt:

```
npm run build
npm start
```

Åpne http://localhost:3030. Nå er det Express som leverer hele nettbutikken.

## Testing (leksjon 11)

Løsningen har to typer automatiserte tester:

| | API-tester | Ende-til-ende-tester |
| --- | --- | --- |
| Verktøy | Mocha + Supertest | Playwright |
| Tester | REST API-et (Express) | Hele løsningen gjennom en ekte nettleser |
| Ligger i | `butikk-tjener/test/` | `e2e/` |
| Kjøres med | `npm test` | `npm run test:e2e` |
| Hastighet | Under ett sekund | Noen sekunder |

### API-tester med Mocha og Supertest

- **Mocha** finner og kjører testene. `describe` grupperer tester, og `it` er én test. Oppsettet ligger i `butikk-tjener/.mocharc.json`.
- **Supertest** sender HTTP-forespørsler direkte til Express-appen, uten at tjeneren startes. Det er grunnen til at tjeneren er delt i to filer:
  - `app.js` lager appen (mellomvare og ruter).
  - `server.js` starter den med `app.listen`.
  - Testene importerer `lagApp` fra `app.js`.
- **`assert`** er Node.js sin innebygde modul for å sjekke resultatet, for eksempel `assert.equal(res.status, 401)`.

Testene er delt i to filer:

- **`test/api.test.js`** trenger ingen database. Den tester at ruter som krever innlogging svarer 401, at registreringen validerer input (400), at ukjente adresser gir 404, og at innloggingen stopper etter 10 mislykkede forsøk (429).
- **`test/api-med-database.test.js`** går hele veien til MySQL:
  - Den registrerer en egen testkunde og sjekker at passordet lagres som en bcrypt-hash.
  - Den logger inn med `request.agent(app)`. En agent husker cookies mellom forespørslene, slik en nettleser gjør.
  - Den bestiller med prisen satt til 0 kr, og sjekker direkte i databasen at det var prisen fra Vare-tabellen som ble lagret.
  - Til slutt (`after`) slettes testkunden igjen.
  - Får ikke testene kontakt med databasen, hoppes de over ("pending") i stedet for å feile.

Testene har allerede funnet én feil. `doQuery` i `services/db.js` lukket ikke databaseforbindelsen når en spørring feilet. Mocha avsluttet derfor aldri, fordi en forbindelse fortsatt var åpen. Feilen er rettet med `try/finally`.

### Ende-til-ende-tester med Playwright

[Playwright](https://playwright.dev) styrer en ekte nettleser (Chromium) og klikker seg gjennom nettbutikken slik en bruker ville gjort. Første gang må nettleseren lastes ned:

```
npx playwright install chromium
```

Kjør testene fra rotmappen:

```
npm run test:e2e
```

Playwright bygger klienten og starter tjeneren av seg selv (`webServer` i `playwright.config.js`), på samme måte som på Heroku. Hvis tjeneren allerede kjører på port 3030 (for eksempel med `npm start` i et annet vindu), brukes den i stedet. Da må klienten være bygget med `npm run build` først.

- **`e2e/navigasjon.spec.js`** tester forsiden, menyen, 404-siden, varelisten, språkbytte og mørk modus. De to siste sjekker også at valget huskes etter omlasting (localStorage).
- **`e2e/handel.spec.js`** tester feil passord og hele handelen: registrering, legge varer i kurven, gå til kassen, F5 (sesjons-cookien gjør at du fortsatt er innlogget) og utlogging. Testkundene slettes etterpå.

Elementer finnes som en bruker ville funnet dem, med rolle og synlig tekst (`getByRole("button", { name: "Logg inn" })`), ikke med CSS-klasser. `expect` venter automatisk til betingelsen er oppfylt, så vi trenger ikke å vente på fetch-kall selv.

Nyttige kommandoer:

- `npm run test:e2e:ui` åpner en grafisk UI-modus der du kan se testene kjøre steg for steg.
- `npx playwright show-report` viser HTML-rapporten fra siste kjøring, med skjermbilder og et "spor" (trace) for tester som feilet.
- `npx playwright codegen http://localhost:3030` åpner en nettleser som tar opp det du gjør, og skriver testkoden for deg. Det er en fin måte å komme i gang med en ny test på.

### Automatisk testing med GitHub Actions (CI)

Tester hjelper bare hvis de blir kjørt. Med **kontinuerlig integrasjon** (CI) kjører GitHub alle testene automatisk hver gang noen pusher til `main` eller lager en pull request. Oppsettet ligger i `.github/workflows/test.yml`.

For hver kjøring starter GitHub en "fersk" Linux-maskin og gjør dette:

1. Starter en MySQL-database i en egen container (`services`), med samme database, bruker og passord som lokalt.
2. Installerer Node.js 24 og pakkene (`npm ci`).
3. Kjører ESLint på klienten.
4. Fyller databasen med `hobbyhuset.sql` og `SettDummyEPostOgPassord.sql`, og kjører `npm run forbered-db`.
5. Kjører API-testene (`npm test`).
6. Installerer Chromium og kjører ende-til-ende-testene (`npm run test:e2e`).
7. Laster opp Playwright-rapporten, som kan lastes ned fra siden til kjøringen.

Resultatet ser du under fanen **Actions** på GitHub. Hver commit får en grønn hake eller et rødt kryss, også i pull requests. Klikk på en kjøring for å se utskriften fra hvert steg.

Workflowen starter av seg selv så snart filen er pushet til GitHub. Du kan også starte den manuelt med **Run workflow** under fanen Actions.

Merk at databasen på GitHub er helt ny for hver kjøring. Testene må derfor ikke være avhengige av data du har lagt inn lokalt. Det er en av grunnene til at testene registrerer sine egne testkunder.

## Deploy til Heroku (leksjon 11)

Hele nettbutikken kjører som **én** Heroku-app: Express leverer både API-et og den ferdigbygde React-klienten. Databasen er MySQL fra add-on-en **JawsDB MySQL**.

### Forutsetninger

- Bruker på [Heroku](https://www.heroku.com) (krever betalingskort) og på GitHub.
- Installert [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) og Git.
- **Denne mappen (`nettbutikk-2026`) må være rotmappen i Git-repoet.** Heroku leter etter `package.json` og `Procfile` på roten av repoet.

### 1. Legg koden i et eget Git-repo

```
git init
git add .
git commit -m "Nettbutikk som monorepo"
```

Synkroniser deretter mot et nytt, tomt repo på GitHub. `.gitignore` på rotmappen sørger for at `node_modules`, `dist` og `.env` ikke blir med.

### 2. Opprett appen og databasen

Bytt ut `hobbyhuset-dittnavn` med et ledig navn:

```
heroku login
heroku create hobbyhuset-dittnavn
heroku addons:create jawsdb:kitefin
```

JawsDB lager en MySQL-database og legger adressen i Config Var-en `JAWSDB_URL`. Den har formatet `mysql://bruker:passord@vert:3306/database`. `config.js` i tjeneren bruker denne adressen automatisk når den finnes. Se adressen med:

```
heroku config:get JAWSDB_URL
```

Det samme kan gjøres i Heroku Dashboard: opprett appen under **New → Create new app**, og legg til JawsDB under **Resources → Add-ons**.

### 3. Fyll databasen med data

Databasen er tom, så den må fylles på samme måte som lokalt:

1. Lag en ny tilkobling i MySQL Workbench med vert, bruker, passord og database fra `JAWSDB_URL`.
2. Kjør `butikk-tjener/config/hobbyhuset.sql`, og deretter `butikk-tjener/config/SettDummyEPostOgPassord.sql`.
3. Gjør e-post unik og hash passordene ved å kjøre `forbered-db` lokalt, men mot Heroku-databasen. I PowerShell:

```
$env:JAWSDB_URL = heroku config:get JAWSDB_URL
npm run forbered-db -w butikk-tjener
Remove-Item Env:JAWSDB_URL
```

NB! MySQL på Heroku kjører på Linux, og der skiller tabellnavn mellom store og små bokstaver: `Vare` og `vare` er to forskjellige tabeller. På Windows er de det samme. SQL som virker lokalt, kan derfor feile på Heroku hvis skrivemåten ikke er lik overalt.

### 4. Sett hemmeligheten for sesjonene

```
heroku config:set SESSION_SECRET=<lang tilfeldig streng>
```

Lag en tilfeldig streng med `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Tjeneren nekter å starte i produksjon uten `SESSION_SECRET`.

Disse trenger du *ikke* å sette, fordi Heroku setter dem selv:

- `PORT`
- `NODE_ENV=production`
- `JAWSDB_URL`

I Dashboard finner du alle Config Vars under **Settings → Config Vars**.

### 5. Deploy

I Dashboard, under fanen **Deploy**:

1. Velg GitHub som Deployment method og koble til repoet.
2. Prøv først **Manual deploy → Deploy Branch**.
3. Slå deretter på **Automatic deploys**. Da deployes appen hver gang du pusher til `main`.
4. Huk av for **Wait for CI to pass before deploy**. Da venter Heroku til GitHub Actions har kjørt testene (se "Automatisk testing med GitHub Actions"), og deployer bare hvis alle går gjennom. Kode med feil når dermed aldri produksjon.

Alternativt kan du deploye direkte fra kommandolinjen med `git push heroku main`.

Følg byggingen under fanen **Activity**, eller med `heroku logs --tail`. Heroku gjør dette:

1. Finner `package.json` på roten og bruker Node.js-versjonen i `engines` (24.x).
2. Kjører `npm ci`, som installerer pakkene til begge workspaces fra `package-lock.json`.
3. Kjører `heroku-postbuild`, som bygger React-klienten (`npm run build`).
4. Fjerner `devDependencies` (Vite, Mocha, Playwright osv.), som ikke trengs i produksjon.
5. Starter appen med kommandoen i `Procfile`: `web: npm start`.

Åpne appen med `heroku open`.

### Hva er annerledes i produksjon?

Se `butikk-tjener/app.js` og `config.js`. Når `NODE_ENV=production`:

- Sesjons-cookien får `secure: true` og sendes bare over HTTPS.
- `app.set("trust proxy", 1)` er slått på. Heroku tar seg av HTTPS i en proxy foran appen. Uten denne linjen tror Express at forespørslene kommer over HTTP, og da sendes ikke den sikre cookien. Grensen for innloggingsforsøk ville dessuten gjeldet alle brukere samlet, fordi alle forespørsler ser ut til å komme fra proxyens IP-adresse.
- Sesjonene ligger fortsatt i minnet. Heroku starter appen på nytt minst én gang i døgnet, og da blir alle logget ut. I en ekte løsning lagres sesjonene i databasen, for eksempel med `express-mysql-session`.

### Feilsøking

- **"Application error"**: Les loggen med `heroku logs --tail`. Mangler `SESSION_SECRET`, står det i loggen.
- **Varelisten er tom**: Databasen er ikke fylt med data, eller tabellnavnene har feil store/små bokstaver (se punkt 3).
- **Fungerer lokalt, men ikke på Heroku**: Kjør `npm run build` og `npm start` lokalt, og test på http://localhost:3030. Det er nesten det samme som Heroku kjører.

### Øvelser

- Lag en bevisst feil, for eksempel ved å fjerne `krevInnlogging` fra `POST /ordrer`. Push, og se at GitHub Actions blir rødt og at Heroku ikke deployer. Hvilken test fanget feilen?
- Skriv en Playwright-test for kartsiden (`/butikker`): klikk på en butikk i listen og sjekk at popupen vises.
- Skriv Mocha-tester for `POST`, `PUT` og `DELETE /varer` med innlogget bruker. Husk å rydde opp etter deg!

## Autentisering med Passport (leksjon 10)

Innloggingen bruker nå Passport ("local strategy"), sesjoner og bcrypt-hashede passord. Kunder kan også registrere seg og logge ut. Første gang må du kjøre `npm run forbered-db` i butikk-tjener. Skriptet gjør e-post unik og hasher passordene i databasen. Detaljer står i README-filene i `butikk-tjener` og `butikk-klient`.

Kort fortalt:

- **Innlogging:**
  - Klienten sender e-post og passord til `POST /innlogging`.
  - Passport sjekker passordet med bcrypt og lagrer kundenummeret i en sesjon.
  - Nettleseren får en sesjons-cookie.
- **Senere kall:**
  - Klienten sender alle kall med `credentials: "include"`, så cookien følger med.
  - Tjeneren vet da hvem kunden er (`req.user`), og beskyttede ruter som `POST /ordrer` slipper gjennom.
- **Omlasting av siden:**
  - Klienten spør `GET /bruker` hvem som er innlogget.
  - Da forblir brukeren innlogget etter F5.

`kodeforklaring.html` har en egen seksjon om Passport. Der finner du en interaktiv «sesjonslab» som viser cookien i nettleseren og sesjonslageret på tjeneren. Under «Reisen» kan du også følge innlogging, omlasting av siden og bestilling steg for steg.

Se spesielt på `src/lib/api.js`, `src/pages/Butikk.jsx` og `src/components/Handlekurv.jsx` i klienten, og på `services/db.js` og `routes/index.js` i tjenerdelen.

## Flerspråklighet (i18n)

Klienten er flerspråklig (norsk og engelsk) med i18next, på samme måte som i `i18n-demo`:

- `src/i18n.js` setter opp i18next. Språket huskes i localStorage, og `lang` på `<html>` oppdateres ved språkbytte.
- Tekstene ligger i `public/locales/no/translation.json` og `public/locales/en/translation.json`, gruppert per komponent (f.eks. `nav.butikk`).
- Komponentene henter tekster med `const { t } = useTranslation();` og `t("nøkkel")`. Se eksempler på variabler (`{{brukernavn}}`) i `Handlekurv.jsx` og entall/flertall (`count`) i `Vareliste.jsx`.
- Språkknappen (EN/NO) ligger i `NavBar.jsx`.
- Utenfor komponenter (`lib/api.js`, `lib/hjelpere.js`) brukes `i18n.t(...)` og `i18n.language` direkte. Beløp formateres etter valgt språk.
- Feilmeldinger fra tjeneren (f.eks. ved feil innlogging) er fortsatt på norsk, siden de lages i butikk-tjener.

## Kart over butikkene (React Leaflet)

Lenken «Finn en butikk nær deg» i bunnteksten går til siden `/butikker`, som viser Hobbyhusets (tenkte) fysiske butikker i et kart. Løsningen bygger på `mapdemo/react-leaflet`:

- `src/lib/butikker.js` inneholder butikkene med posisjon `[breddegrad, lengdegrad]`. I en reell løsning ville de ligget i databasen og blitt hentet med fetch.
- `src/pages/Butikker.jsx` viser kartet med `MapContainer`, `TileLayer` (OpenStreetMap), `Marker` og `Popup`.
- Kartutsnittet tilpasses automatisk slik at alle butikkene vises (`bounds`).
- Klikk på en butikk i listen flytter kartet dit. Det gjøres via `useRef`, som gir tilgang til selve Leaflet-kartobjektet (`kartRef.current.flyTo(...)`).
- Merk fiksen for markørikonet øverst i `Butikker.jsx`: uten den vises ikke markørene etter `npm run build`, fordi Vite gir bildefilene nye navn.

## Interaktiv kodeforklaring

Åpne `kodeforklaring.html` (i denne mappen) direkte i nettleseren, uten installasjon. Siden forklarer samspillet mellom frontend og backend steg for steg, med animasjoner og små quizer. Den dekker innlogging med Passport og teknikkene over: Tailwind, mørk modus, i18n og kart. Den består av én enkelt HTML-fil med HTML, CSS og JavaScript.
