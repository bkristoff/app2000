# Introduksjon til Route Handlers i Next.js

Vi har tidligere sett på hvordan vi kan bygge klientdelen fra create-next-app, der vi skrev "use client" i hovedsidene (page.js).

Nå kommer en liten vri, som viser hvordan du kan lage et REST API, i den samme løsningen.

Tok utgangspunkt i butikk-klient-1 fra leksjon 6, altså en minimal Next/React-løsning.

## 1. Installere

Som vanlig:

```
npm install
```

## 2. Forenkle appen

Legg til "demo-lenke" i app/page.js:

```
<a href="http://localhost:3000/api/kunder"></a>
```

## 3. Lag dummy REST API

Opprett følgende mapper og filer:

```
app/api/kunder/route.js
app/api/varer/route.js
app/api/route.js
```

Filen app/api/kunder/route.js kan se slik ut (i en reell løsning må vi levere JSON-data her, se leksjon 7):

```
export async function GET() {
  return Response.json({ data: "Her kommer alle kundene." });
}

export async function POST() {
  return Response.json({ data: "Ny kunde satt inn i databasen." });
}
```

De øvrige route.js-filene kan lages på tilsvarende måte.

Du har nå et (slags) REST API som du kan bruke fra klientdelen på samme måte som vi har brukt butikk-tjener fra butikk-klient.

## 4. Start appen

```
npm run dev
```

Åpne deretter nettleseren på adresse http://localhost:3000 og prøv å klikke på demo-lenken.
