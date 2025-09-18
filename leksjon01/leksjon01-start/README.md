# Leksjon 1. Introduksjon til APP2000

- Dette er en stegvis forklaring til hvordan du kan jobbe med [leksjon 1] (https://dbsys.info/2000/leksjon01).
- Filen fungerer også som en huskeliste for meg på undervisning.
- Jeg bruker "markdown"-formatet (filutvidelse md) til slike filer.
- Formatet fungerer fint for å dokumentere GitHub-prosjekter og kan vises pent både i VS Code og i nettlesere.

## 1. Om APP2000

- Undervisningsopplegg
- Faglig introduksjon
- Canvas: Moduler og framdriftsplan
- [Generelt om prosjektoppgaven] (https://dbsys.info/2000/prosjekt/index.html)
- [Prosjektoppgaven 2025/2026] (https://dbsys.info/2000/prosjekt/oppgave.html)

## 2. Verktøy + HTML/CSS

- [Visual Studio Code] (https://code.visualstudio.com/)
- [Node.js +npm] (https://nodejs.org/en/)
- Last ned og installer begge
- Extensions
  - ESLint (best practice råd)
  - Prettier (automatisk innrykk)
  - Print (kjekk ved utskrift til pdf av flere filer)
- Åpne/lage tom mappe
- Ny HTML-fil med snippet !+ENTER og lag avsnitt med p+ENTER
- Lagre med CTRL+S og lagre alle med CTRL+K+S
- Prettyfier: ALT+SHIFT+F (eller CTRL+S)
- Søk på tvers av filer
- Sammenligne filer (åpne begge, select for compare, compare with selected)
- Tegnsett + Innrykk + Linjeskift (vises og kan endres fra statuslinjen)
- Innstillinger Themes | Color Theme
- Keyboard shortcuts CTRL K + CTRL S
- Kommandopalett CTRL + Shift + P

- Preview av HTML-filer i VS Code (knapper oppe til høyre)
- HTML+CSS kan testes lokalt i nettleser (Chrome / Firefox)
- Publisere HTML-fil på GitHub Pages

- Firefox Developer Tools CTRL + SHITF + I (tilsvarende i Chrome)
- Inspector: klikk i HTML-koden og se at en del av nettsiden blir markert
- "Docke" Inspector nederst eller til høyre
- Console: Sjekk denne for feilmeldinger!

## 3. Snippets med Emmet +

Snippets er "forkortelser" som kan gjøre at du skriver kode raskere og med færre feil.

Noen eksempler å prøve ut:

```
!
h1
div>ul>li
div+p+bq
div+div>p>span+em
div+div>p>span+em^bq
ul>li*5
div>(header>ul>li*2>a)+footer>
(div>dl>(dt+dd)*3)+footer>p
div#header+div.page+div#footer.class1.class2.class3
ul>li.item$*5
a{Click me}
p>{Click }+a{here}+{ to continue}
```

## 4. GitHub Copilot/Chat

Med GitHub Copilot får man enda kraftigere "skrivehjelp".

Flere måter å bruke verktøyet på:

- Skrive kommentar i kodevinduet + TAB
- CTRL+I i kodevinduet og deretter skriv inn et KI-prompt
- Chat-vinduet:
  - Skriv et prompt
  - Eventuelt med bruk av prompt-kommandoer /explain /fix /clear /context
    (bare å spørre hva de betyr...)
  - Sett opp i "modus": Edit, Ask eller Agent
    (igjen bare å spørre hva de betyr)
  - Velg språkmodell? (Har ikke hatt behov for det foreløpig)

Krever at man har GitHub-bruker. Søk nå (legg ved studentbevis), det tar noen dager:

[GitHub Education] (https://github.com/education/students)

Tips:

- Ikke la KI løse alle kodeproblemer for deg.
- For å bli god til å bruke KI, må du forstå faget (programmering).
- Og for å forstå programmering, må du ha mengdetrening (også helt uten KI).
- Samtidig: For å bli en konkurransedyktig utvikler, må du nok også bli god på KI.

## 4. HTML

- [Tutorials på w3schools] (https://www.w3schools.com/html/)
- Hva bør man huske? Hva er viktig?

Standard HTML-side (HTML5)

- Lag "mal" med snippet ! (mer om dette under)
- doctype, lang, charset, viewport, title

Prettyfier: ALT+SHIFT+F

Noen viktige begreper (forklar til medstudent):

- Element, tagg, attributt, verdi
- DOM (hva står forkortelsen for og hva er det?)

Noen elementer/tagger:

```
html, head, body, title
p, h1-h6, table, ul, ol
a, img, link
em, b, it
br
div, span
```

Semantiske elementer (hva er fordelen med det?)

- header, nav, section, article, aside, footer, summary

Attributter:

- src, href, alt,...

Block-level elementer ...

- div, p, h1,...

og inline elementer (hva er forskjellen?)

- span, a, b,...

```
<!-- Kommentarer -->
```

Entiteter

```
&nbsp; &larr; &amp;
```

## 5. CSS

Inline CSS ...

```
<h1 style="color:blue;text-align:center;">This is a heading</h1>
```

eller internt stilark ...

```
<style></style>
```

eller eksternt stilark (tenk: mange HTML-filer, ett stilark)

```
<link rel="stylesheet" type="text/css" href="mystyle.css">
```

Formatet til en CSS-regel: selektor { dekl; dekl; prop:val }

```
h1       {}
#id      {}
.class   {}
*        {}
h1, h2   {}
div p    {}
div > p  {}
div + p  {}
div ~ p  {}
```

Egenskap: verdi

```
color:blue;
background-color:rgb(255, 99, 71);
background-color:#ff6347;
font-size:160%;
border:2px solid blue;
```

Bruk av div, span, class, id

[Boksmodellen] (https://www.w3schools.com/css/css_boxmodel.asp)

- margin, padding, border

CSS i prosjektet

- Dere kan velge CSS-løsning
- Noen muligheter:
  - Skrive all CSS-kode selv uten biblioteker
  - Bootstrap
  - Tailwind

## 6. Nettsidedesign med Bootstrap (og CSS Grid)

[Leksjon 1, oppgave 5] (https://dbsys.info/2000/leksjon01)

- Idéen er å designe nettsider i et "rutenett" med opp til 12 "celler" i bredden.
- Åpne HTML-filene på mappe bootstrap-demo.
- Start med side1.html og følg instruksjonene i koden.
- Gjør deretter side2.html tilsvarende (denne siden skal være responsiv).

Se deretter på filene i mappe grid-demo.

- Bruker [CSS Grid] (https://www.w3schools.com/css/css_grid.asp)
- Rett opp grid-template-areas i CSS-filen slik at menyen kommer til venstre,
  faktaboksen til høyre og footeren nederst.

## 7. Publisere nettside på GitHub

- Lag GitHub-bruker
- Publisere Bootstrap-nettsiden på GitHub Pages
- Oppgave 3 på (https://dbsys.info/2000/leksjon01)
