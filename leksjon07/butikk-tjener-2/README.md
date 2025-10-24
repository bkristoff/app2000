# Lagring i MySQL

I leksjon 8 skal vi utvide tjenerdelen med database. Her er noen tips hvis du vil forberede deg.

## 1. Installere MySQL

```
npm install mysql2
```

## 2. Sett opp en MySQL-database for Hobbyhuset

Lag en tom database butikk med en "app-bruker" butikkapp:

```
CREATE DATABASE butikk;
CREATE USER 'butikkapp' IDENTIFIED BY 'hemmelig';
GRANT ALL PRIVILEGES ON butikk.\* TO 'butikkapp';
```

Logg inn med bruker butikkapp og kjør SQL-skriptet for Hobbyhuset:

- https://dbsys.info/Databasesystemer/1_Datasett/sqlskript.html

Legg til ny kolonner EPost og Passord i tabellen Kunde og sett inn dummy-data.

## 3. Kjør spørringer fra en Express-rute

Prøv ut eksempelspørringer basert på eksempler i dokumentasjonen til mysql2:

- https://sidorares.github.io/node-mysql2/docs

## 4. Forstå promises og async

Les deg opp på programmeringsteknikkene promises og async:

- https://javascript.info/async
