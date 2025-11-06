# Lagring i MySQL del 1

Vi skal nå utvide tjenerdelen med lagring til en MySQL-database.

Her er noen tips hvis du vil prøve å komme fra butik-klient-2 til butikk-klient-3 på egen hånd.

En annen måte å lære på, er å ta utgangspunkt i butikk-klient-3, og utvide løsningen med håndtering av en ny tabell (se README-filen i butikk-klient-3).

## 1. Installere MySQL

```
npm install
npm install mysql2
```

## 2. Sett opp en MySQL-database for Hobbyhuset

Sørg for at lokal MySQL-database er installert og kjører.

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

## 4. Forstå promises og async

Filen test-database.js inneholder demo-kode (ikke er en del av ferdig løsning).

Første del av filen definerer en metode hentVarerDummy som demonstrerer promises og async, men som er uavhengig av både databasen og Express. Kommenter inn kodelinje 7 til 33 og kjør:

```
node ./test-database.js
```

## 5. Kjør testkode mot databasen

Siste del av filen test-database.js inneholder demokode som utfører to SELECT-spørringer mot databasen, men som ikke er avhengig av Express. Den første spørringen henter alle varer den andre spørringen henter én vare. Kommenter inn kodelinje 38-81 og kjør skriptet på nytt.

Prøv også å bruke await som forklart på linje 67-68.

## 6. Kjør SELECT-spørringer via Express

Flytt de to funksjonene hentVarer og hentVare inn i services/db.js. Her skal de erstatte dummy-versjonene som allerede ligger her.

Gjør koden mer elegant ved at du faktoriserer ut kode, som nå blir gjentatt, i en ny hjelpefunksjon doQuery:

```
async function doQuery(sql, params) {
  let conn = await mysql.createConnection(config.db);
  let result = await conn.execute(sql, params);
  await conn.end();
  return result;
}
```

## 7. Implementer alle CRUD-operasjonene mot Vare

Lag resten av CRUD-operasjonene mot Vare: settInnVare, oppdaterVare og slettVare.

Lag også en funksjon hentKunde som henter én kunde og en funksjon hentVarerPaginert, som leverer varer "paginert", f.eks. skal hentVarerPaginert(snr, ant) levere "side 3" av en vareliste som viser 10 varer av gangen - i forhold til sortering på VNr.

## 8. Test CRUD-operasjonene

Test de nye metodene ved å kjøre http-filene via REST-klienten (VS Code extension) som vi installerte sist gang. Lag eventuelt nye http-filer.

Dette forutsetter at databasen kjører og at du har startet Express-serveren:

```
npm start
```
