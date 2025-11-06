# Leksjon 8. Databaseprogrammering

Vi skal nå utvide backend til nettbutikken med lagring i database.

- Se leksjon 8: https://dbsys.info/2000/leksjon08

Vi skal se på tre databaseløsninger:

- MySQL via biblioteket mysql2: butikk-tjener-2 og butikk-tjener-3
- MySQL med ORM-en Sequelize: butikk-tjener-sequelize-1 og butikk-tjener-sequelize-2
- MongoDB (lokal database og bruk av Compass): butikk-tjener-mongodb-1 og butikk-tjener-mongodb-2

Som tidligere legger jeg altså ut "start-prosjekter" og "ferdig-prosjekter".

- Det begynner nå å bli en del kode og sette seg inn i.
- Kanskje det er like lurt å gå rett på det ferdige prosjektet, prøve å forstå koden, og deretter lage "varianter".
- Eksempel: Jeg har valgt å kode mot varedata som eksempel. Prøv å lage tilsvarende kode mot kundedata eller ordredata.
- Velg til slutt en av databaseløsningene, og tilpass koden til tur-appen.

Merk:

- Ved oppdatering fra Express 4 til 5, ser jeg at Copilot anbefaler en try/catch-måte å programmere håndtering av routes.
- Dette er gjort for MySQL-varianten, altså butikk-tjener-1 og butikk-tjener-2.
- Men ikke for MongoDB og Sequelize.
