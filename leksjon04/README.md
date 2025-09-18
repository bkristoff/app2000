# Leksjon 4: Versjonskontroll med Git og GitHub (https://dbsys.info/2000/leksjon04/index.html)

Etter hvert vil dere nok bruke "git-verktøyene" i VS Code (pek-og-klikk), men for forståelsen er det nyttig å lære seg kommandogrensesnittet også.

- Vurder hvor "dypt" du vil gå når det gjelder å lære deg kommandolinjen.

## 4-1. Plan for forelesningen

- Git på lokal maskin
  - Intro til versjonskontroll og Git (PowerPoint)
  - Installere Git
  - Git fra kommandolinja (Git Bash)
  - Git i VS Code
- GitHub
  - Laste ned/klone prosjekter fra GitHub
  - Lage bruker på GitHub og opprette egne prosjekter
  - Synkronisere med GitHub fra kommandolinje og fra VS Code
- Node.js og npm
  - Lage npm-prosjekt med pakke (mathjs)
  - Versjonskontroll og bruk av biblioteker (.gitignore)

## 4-2. Tips

Pro Git Book anbefales: (https://git-scm.com/book/en/v2)

Ha gjerne Sikt KI (https://ki-chat.sikt.no/) eller Copilot Chat tilgjengelig som hjelper. Eksempelspørsmål:

- Hvordan fletter man to greiner med Git kommandolinje?
- Hva er forskjellen på Git CLI, Git Bash, Command Prompt og PowerShell?

## 4-3. Installere Git på lokal maskin

[Installere Git] (https://git-scm.com/)

- Bruk standardinnstillingene, men velg VS Code som editor.

Oppdatere Git til nyeste versjon (fra kommandolinjen, altså først åpne terminalvindu i VS Code):

```
git update-git-for-windows
```

## 4-4. Git fra kommandolinja

Kommandovindu-alternativer:

- Windows Command Prompt
- PowerShell
- Git Bash
- Integrert i VS Code eller separat

Jeg bruker PowerShell som terminalvindu i VS Code.

### Få hjelp

```
git --version
git help git
git help config
git config --help
git config -h
```

### Konfigurering

Definere eget brukernavn og e-post (jeg bruker samme e-post som på GitHub). Dette gjøres kun 1 gang:

```
git config --global user.name "Kari Nordmann"
git config --global user.email kari@xyz.no
```

Omnavne standard-"branch" (mer om "greiner" lenger ned) fra master til main (forenkler jobbing mot GitHub og gjøres også kun 1 gang):

```
git config --global init.defaultBranch main
```

### Opprette nytt repo (fra tom mappe)

Lage en mappe og fortelle Git at den skal versjonskontrollere den:

```
mkdir gitdemo
cd gitdemo
git init
```

For spesielt interesserte: Fra View-menyen i Filbehandleren (den i Windows, ikke den i VS Code), kryss av for å vise Hidden Items:

- Viser nå .git-mappa

Aldri endre på noe i .git-mappa, men det er altså her hele historikken til repoet ligger. Fjern gjerne krysset igjen.

### Legge til filer med add og commit

Legge til fil1.html og fil2.html i mappe gitdemo.

- De to filene er likevel ikke en del av repoet foreløpig.
- VS Code viser dem med en U for "untracked".

Hva gjør add-kommandoen?

```
git add -h
```

Legg til alle HTML-filer i staged area med add:

- Filene får nå en A for "added".

```
git add *.html
```

Eventuelt kan man legge til alle filer:

```
git add .
```

Bekreft med commit:

```
git commit
```

Editoren du valgte ved installasjon åpnes og du skriver inn en "commit-melding", lagrer og lukker.

Alternativt kan du bruke commit med melding:

```
git commit -m 'Første versjon'
```

Hvis det kun er snakk om endringer i eksisterende filer (ikke nye filer), så kan slå sammen add og commit til én kommando:

```
git commit -a -m 'melding'
```

### Sjekk status

```
git status
```

Hvis alle endringer er "addet" og du nettopp har kjørt "commit", så får du respons:

```
"nothing to commit, working tree clean"
```

Test litt mer. Gjør først noen endringer:

- Legg til en linje i fil1.html
- Slett et ord i fil2.html
- VS Code viser nå en M for "modiified"

Vis kort status

```
git status -s
```

Legg til endringene i fil1.html i staged area:

```
git add fil1.html
```

Legg til ny fil fil3.html i mappe og vis status:

```
git status
```

For å få fil3.html i staged area (slik at den "blir med" ved neste commit):

```
git add fil3.html
git status
```

Endre fil1.html som nå både "er i" staged area og working area.

```
git status
```

Hvilke filer er endret, men ikke staged?

```
git diff
```

Hva er i staged og blir med i neste commit?

```
git diff --staged
```

Hvordan få med alle endringer og igjen få "working tree clean"?

```
git add .
git commit -a -m 'melding'
git status -s
```

### Ignorere visse filer, f.eks. loggfiler

Når vi seinere skal synkronisere mot GitHub, blir dette viktig. Du vil f.eks. ikke at lokale passordfiler skal bli med ut på GitHub. Vi kan teste dette lokalt.

Opprett ny fil .gitignore med følgende innhold:

```
logg.txt
\*.csv
tmp/
```

Lag filer/mapper og sjekk at de ignorerte filene faktisk ikke blir med (selv om du nå bruker git add . skal f.eks. logg.txt ikke bli med). Følgende kommando viser hvilke filer som faktisk er med i repoet:

```
git ls-files
```

### Jobbe med greiner (branches)

Lage en ny grein (branch) og bytte til denne greinen:

- Kanskje for å legge til ny funksjonalitet meldt inn av en bruker/kunde som sak 37 i et "ticket-system"?

```
git checkout -b issue37
```

Hvilken branch står vi i?

```
git branch --list
```

Gjør endringer i et antall filer (fra issue37) og gjør commit:

```
git commit -a -m 'melding'
```

Bytte mellom greiner kan gjøres med checkout, men switch er enklere.

```
git switch main
```

Prøv ut: Veksle mellom main og issue37 mens du gjør endringer med commit og viser status.

### Flette to greiner og håndtere "merge"-konflikter

Stå i hovedgreinen og flett inn endringene fra en annen grein:

```
git switch main
git merge issue37
```

Fletting kan gi "merge conflict" (jf. "lost update" i databaser).

- Prøv f.eks. at main og issue37 har gjort to forskjellige endringer i samme linje.
- Får valg: grein A eller B eller håndtere manuelt?
- VS Code har gode og intuitive "visuelle verktøy" for å håndtere fletting.
- Husk å håndtere konflikter lokalt før du pusher til felles repo på GitHub!

### Versjonering (kan utsettes)

Hver commit lager et nytt "snapshot" av koden. Noen slike vil man kanskje sette i produksjon og tildele et versjonsnummer:

```
git tag -a v1.2 -m "versjon 1.2"
git tag
```

### Historikk (kan utsettes)

Git holder rede på alt som er gjort. Prøv disse:

```
git log
git log --oneline
```

## 4-5. Git i VS Code (GUI)

Kan (som vi har sett) bruke terminalvindu i VS Code, men det er lettere å bruke GUI? Prøv å få til dette fra brukergrensesnittet:

- Opprett tom mappe lokalt
- Velg "Source Control" ute til venstre
- Initiere repo ("Initialize Repository")
- Velg "Explorer" ute til venstre
- Opprett mapper og filer
- Gå til "Source Control" og legg til nye filer i staging area
- Commit med melding
- Se på filstruktur som liste eller hierarki
- Se at filene er merket med U, A, M
- Lag grein
- Gjør endringer i main og ekstragrein
- Flett og håndter konflikt

## 4-6. Koble opp mot GitHub-repo

Det er flere måter å gjøre det på. Jeg synes det enkleste er å starte på GitHub.

Opprett nytt repo på GitHub ("New"):

- Velg Private
- Legg til README.md
- Legg til .gitignore (tilpasset "Node.js")
- Velg lisens (f.eks. MiT)

Klone GitHub-repoet til lokal mappe:

- Stå i mappen over der du vil lage repoet og kjør clone-kommandoen under, der du må sette inn eget brukernavn og navnet på repoet.
- Du kan få tak i adressen til repoet ved å klikke den grønne Code-knappen på GitHub.

```
git clone https://github.com/<BRUKER>/<REPO>.git
```

### Synkronisering med ett knappetrykk

GitHub-verktøyet til VS Code har flere menyvalg/knapper som tilsvarer Git-kommandoer:

- Pull for å hente endringer fra GitHub til lokalt repo
- Merge for å flette to greiner (typisk nye ting fra GitHub med din lokale versjon)
- Push for å publisere dine endringer til GitHub

Og en knapp "Synchronize" som er lik pull + push + merge.

- Altså sørger for at din lokale kopi er lik det som nå ligger i GitHub.

Prøv ut å gjøre endringer lokalt og på GitHub (det siste kan simulere endringer fra en annen).

Ved "merge conflict":

- Accept incoming | Accept current | Accept both | Manual

Når du har laget noe nytt:

- Test koden godt!
- Hent inn siste versjon fra GitHub (med endringer som andre har gjort).
- Flett med din egen kode og håndter eventuelle konflikter.
- Test at koden fortsatt virker!
- Push dine nye endringer til GitHub: kan enten gjøres rett mot main, eller en ny grein, og kanskje be andre på gruppa om å se gjennom og godkjenne? Her må dere eksperimentere litt for å finne en arbeidsform som fungerer for dere.

### Hvis du vil fortsette fra kommandolinjen (for spesielt interesserte)

Start med å lese om "remote" og "origin" i Git-boken.

Navn på "remote":

```
git remote
```

Vise "origin":

```
git remote show origin
```

Alternativ til å knytte sammen lokalt repo og GitHub:

- Publisere lokalt repo på tomt GitHub-repo

```
echo "# demo-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<BRUKER>/<REPO>.git
git push -u origin main
```

Pull - laste ned siste versjon

- Gjør både fetch og merge

```
git pull
```

Pushe fra lokal maskin til GitHub (upstream)

```
git push -u origin main
```

## 4-7. Node.js og npm

npm er en "packet manager", altså et verktøy for å installere tredjeparts biblioteker inn i ditt prosjekt.

Lage npm-prosjekt med pakke (mathjs) (https://www.npmjs.com/package/mathjs)

- Godta alle standardvalg som du blir spurt om

```
npm init
npm install mathjs (npm i mathjs)
```

Legg til/endre i package.json

```
"type":"module",
```

Testkode på index.js

```
import { pow } from 'mathjs'
console.log(pow(2, 5));
```

Kjør:

```
npm start
```

- Ta en kikk på package.json og package-lock.json
- Og koden til mathjs under node_modules

Slett node_modules og package-lock.json og bygg på nytt:

```
npm install
npm start
```

## 4-8. Versjonskontroll og bruk av biblioteker (.gitignore)

Hvis du bruker npm, så bør bibliotekene IKKE sjekkes inn.

- Fordi de kan hentes inn vha. npm install ...

Opprett .gitignore med 1 linje (eller Node-mal fra GitHub):

```
node_modules
```

Vis hvilke filer som er med i repo:

```
git ls-tree -r main --name-only
```
