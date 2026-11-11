# Instruks til Claude

Denne mappen inneholder undervisningsmateriale til leksjon 9 i emnet APP2000 Applikasjonsutvikling for web, som er et andreårsemne på et IT-studium ved et universitet. Studentene har til nå lært grunnleggende React og JavaScript, og grunnleggende om REST API med Express. Vi har brukt en enkel nettbutikk Hobbyhuset som "case", og vi har bygd opp en enkel frontend og backend for denne løsningen. Vi skal nå koble sammen frontend og backend med Fetch API. Og vi skal også se på noen andre temaer, som f.eks. i18n, bruk av kart (maps) og litt minidemoer om ajax og node.

Mappen inneholder undermapper og README-filer som forklarer de ulike kodebitene.

## Steg 1: Sjekk

Les gjennom eksempelkoden, sjekk om det kjører eller må oppdateres (laget i fjor), og foreslå eventuelle endringer.

## Steg 2: Friske opp nettbutikk-2026

På undermappe nettbutikk-2026 ligger nå en kopi av både frontend (butikk-klient) og backend (butikk-tjener) for nettbutikken til Hobbyhuset.

Gjør brukergrensesnittet (til løsningen på denne undermappen) mer profesjonelt ved å bruke Tailwind, men endre ikke funksjonaliteten.

## Steg 3: useContext og mørk modus

"Mørk modus" er vel et greit eksempel på bruk av useContext i React? I så fall, lag en meget enkel implementasjon av mørk modus i nettbutikk-2026.

## Steg 4: Flerspråklighet

Applikasjonen skal gjøres flerspråklig. Bruk biblioteket i18n og enkle teknikker som demonstrert på undermappe i18n-demo.

## Steg 5: Enkel bruk av kart

Applikasjonen skal utvides med enkel bruk av kart og kartbiblioteker som f.eks. demonstrert på undermappe mapdemo/react-leaflet. En anvendelse kan være å vise lokalisering av de (tenkte) fysiske butikkene til Hobbyhuset, f.eks. fra en lenke i footeren på nettsiden.

## Steg 6: Interaktiv kodeforklaring

Bygg en interaktiv nettside som kan brukes for å forklare IT-studenter hvordan de ulike delene av koden fungerer, med spesiell vekt på hvordan frontend og backend samhandler, samt teknikkene lagt til i steg 2 til 5 over. Nettsiden bør vise sammenhengen mellom oppførselen til løsningen og de ulike delene av koden. Lag et moderne design på nettsiden, og bruk animasjoner for å forklare krevende konsepter. Nettsiden skal oppfordre til aktiv læring ved bruk av f.eks. små quizer, eller lignende. Nettsiden skal bygges kun ved hjelp av HTML, CSS og JavaScript, og bestå av en enkelt HTML-fil. Kall filen kodeforklaring.html og legg den på mappe nettbutikk-2026.

## Steg 7: Bygg ny presentasjon til forelesning

På undermappe forelesning ligger fjorårets PowerPoint brukt på forelesning. Den er ikke helt oppdatert. Lag en helt ny PowerPoint, som får fram de viktigste konseptene og teknikkene som blir brukt i demo-applikasjonen på nettbutikk-2026. Noen viktige temaer: hvordan få frontend (react) og backend (express) og database (mysql) til å jobbe sammen (fetch), single page web app, transaksjoner, i18n, enkel kartfunksjonalitet (react og leaflet), local storage, aktuelle hooks i react (f.eks. useEffect, useState, useContext), litt historikk (AJAX og lignende). Gi presentasjonen et lyst og moderne design og lagre filen på undermappe forelesning. Maks 30 slides.
