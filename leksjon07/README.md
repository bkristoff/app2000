# Leksjon 7. Bygge REST API med Express

Vi skal nå bruke JavaScript-biblioteket Express.js for å bygge backend til nettbutikken i form av et såkalt REST API.

- Se leksjon 7: https://dbsys.info/2000/leksjon07

Den ferdige nettbutikken vil dermed bestå av to apper som jobber sammen:

- butikk-tjener (API som leverer JSON-data)
- butikk-klient (SPA + AJAX-kall)

Et monorepo er et repo som inneholder både frontend-kode og backend-kode.

- Dette kan være en behagelig måte å organisere seg på for oss.
- Altså: Lag et repo med to mapper som heter frontend og backend
- I utgangspunktet kan monorepo-er åpne for deling av kode på tvers av frontend og backend (f.eks. kode som gjør validering av inndata), det får vi komme tilbake til.
- Det er litt mer komplisert å "deploye" monorepoer, det må vi også komme tilbake til.

## 1. Bygge REST API for butikk-tjener fra version 0 til 3

Se README-filer i hver enkelt versjon for detaljer.

## 2. For spesielt interesserte: GraphQL

Vi bruker REST i APP2000, men GraphQL er en interessant og nyere teknologi å kjenne til.

- Teste ut i nettleseren

https://graphql.org/learn/

- Verktøy

https://graphql.org/code/
