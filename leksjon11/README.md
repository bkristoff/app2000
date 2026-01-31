# Leksjon 11. Testing

Den praktiske kodedelen av denne leksjonen tar for seg unit-testing, deployment til web server og et kopilot-eksperiment.

- https://dbsys.info/2000/leksjon11/index.html

## Mappe demo-js-mocha

Mocha er et JavaScript-bibliotek for å gjøre unit testing, altså automatisert testing.

## Mappene heroku-demo-klient og heroku-demo-tjener

Et eksempel på hvordan man kan "deploye" en minimal React-klient og et tilsvarende minimalt Express REST API til Heroku.

Løsningen bruker en PostgreSQL-database (dette er "default" database på Heroku).

## Mappen nettbutikk

Dette er den komplette nettbutikken med React/Vite/Express/Passport/MySQL organisert som et monorepo, altså at klient (frontend) og tjener (backend) er undermapper i samme GitHub-repo.

README-filen forklarer hvordan man deployer et slikt monorepo til Heroku.

## Mappen discgolf

Dette forklarer et lite "kopilot-eksperiment", der jeg beskriver krav til en webapplikasjon for å spille discgolf i markdown-filer, både krav til teknologi/arkitektur og funksjonalitet.
