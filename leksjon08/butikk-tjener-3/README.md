# Lagring i MySQL del 2

Vi skal nå utvide løsningen med lagring av data om kunder.

Vi følger "mønsteret" for Vare-tabellen.

Du kan hoppe over punkt 1 til 3 hvis du gjorde dette i butikk-tjener-2.

## 1. Installere MySQL

```
npm install
npm install mysql2
```

## 2. Sett opp en MySQL-database for Hobbyhuset

Sørg for at en lokal MySQL server er installert og kjører.

Lag en tom database butikk med en "app-bruker" butikkapp, som kan jobbe med denne databasen:

```
CREATE DATABASE butikk;
CREATE USER 'butikkapp' IDENTIFIED BY 'hemmelig';
GRANT ALL PRIVILEGES ON butikk.* TO 'butikkapp';
GRANT SHOW DATABASES ON *.* TO 'butikkapp';
GRANT SHOW VIEW ON *.* TO 'butikkapp';
GRANT SELECT ON *.* TO 'butikkapp';
FLUSH PRIVILEGES;
```

Logg inn med bruker butikkapp og kjør SQL-skriptet for Hobbyhuset i butikk-databasen:

- https://dbsys.info/Databasesystemer/1_Datasett/sqlskript.html

Kjør deretter hjelpeskriptet som tilpasser databasen til vår webapp:

```
config/SettDummyEPostOgPassord.sql
```

## 3. Tilpass config.js

Endre parametre på styrefilen config/config.js slik at det passer med ditt oppsett.

Hvis du jobber med Git, så bør denne filen nevnes i .gitignore slik at den ikke blir med i repoet.

## 4. Lag nye ruter

Se på filen routes/index.js og ruter mot Vare-tabellen. Lag følgende Kunde-ruter:

- Hent alle kunder
- Hent en bestemt kunde
- Hent en "side" med kunder (paginering)
- Sett inn en ny kunde
- Endre opplysninger om en bestemt kunde
- Slett en bestemt kunde

## 5. Lag nye funksjoner på mappe services

Se på filen services/db.js og CRUD-funksjoner mot Vare-tabellen.

Lag følgende CRUD-funksjoner mot Kunde-tabellen:

- hentKunder
- hentKunde
- hentKunderPaginert
- settInnKunde
- oppdaterKunde
- slettKunde

## 6. Lag og kjør nye testfiler

Lag http-filer for å teste ut alle Kunde-rutene med REST Client.

Start med å kopiere tilsvarende Vare-filer.

Et testopplegg:

- Vis alle kunder
- Vis en bestemt kunde
- Sett inn en ny kunde
- Vis denne kunden
- Endre opplysninger om en bestemt kunde
- Vis denne kunden
- Slett den nye kunden du satt inn
- Vis alle kunder (og sjekk at den du slettet er borte)

Underveis kan du også inspisere databasen og sjekke at effekten er som forventet.

Det aller beste hadde jo vært om alt dette lot seg automatisere.
