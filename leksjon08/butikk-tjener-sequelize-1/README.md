# Fra Express + MySQL til Express + MySQL + Sequelize

Sequelize er en JavaScript-ORM (Object Relational Mapping) som gjør at vi kan kode mer objektorientert mot MySQL.

## 1. Installere

I tillegg til npm-pakkene express og mysql2, så trenger vi sequelize:

```
npm install express mysql2 sequelize
```

Eller (fordi vi allerede har package.json):

```
npm install
```

## 2. Sett opp databasen og lag bruker

Sørg for at lokal MySQL-database er installert og kjører.

Lag en ny, tom database seqbutikk med en "app-bruker" seqapp, som kan jobbe med denne databasen:

```
CREATE DATABASE seqbutikk;
CREATE USER 'seqapp' IDENTIFIED BY 'hemmelig';
GRANT ALL PRIVILEGES ON seqbutikk.* TO 'seqapp';
GRANT SHOW DATABASES ON *.* TO 'seqapp';
GRANT SHOW VIEW ON *.* TO 'seqapp';
GRANT SELECT ON *.* TO 'seqapp';
FLUSH PRIVILEGES;
```

## 3. Rediger styrefilen

Endre oppkoblingsparametre på config/config.js slik at det passer med ditt oppsett (hvis du har valgt andre navn).

## 4. Lag modellklasser

Det er allerede laget modellklasser for tabellene Vare og Kategori, men kategori-modellen mangler en av kolonnene. Legg til denne.

## 5. Fullfør testskriptet og kjør det

Se på koden i testSequelize.js, fullfør koden (se TODO-kommentarer) og kjør skriptet.

- Tips: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

## 6. Lag CRUD-operasjoner

Bruk koden fra testSequelize som inspirasjon til å kode ferdig CRUD-operasjonene. Tips:

- https://sequelize.org/docs/v6/core-concepts/model-basics/
- https://sequelize.org/docs/v6/core-concepts/model-instances/

## 7. Start tjenesten og test CRUD-operasjonene

Start MySQL-databasen og deretter Express-serveren:

```
npm start
```

Test løsningen med http-filene og REST-klienten fra VS Code som før.
