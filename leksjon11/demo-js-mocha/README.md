# Unit-testing med Mocha (og Chai) + enkel debugging

## Installere

```
npm install
```

Eller fra skrætch:

```
npm init
npm install chai mocha
```

## Unit testing

Filen kino.js inneholder en funksjon kinopris.

- Tilhørende unit-tester ligger i test/test-kino.js.

Kjør Mocha-tester (se package.json):

```
npm test
```

2 tester skal gå gjennom og 1 test skal feile.

- Rett feilen i kino.js.

Se evt. på Chai - bibliotek for å skrive testbetingelser (assertions).
