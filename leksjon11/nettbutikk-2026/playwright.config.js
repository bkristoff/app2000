import { defineConfig, devices } from "@playwright/test";

// Oppsett for ende-til-ende-testene (mappe e2e). Kjør med: npm run test:e2e
//
// Playwright styrer en ekte nettleser (Chromium) og klikker seg gjennom
// nettbutikken slik en bruker ville gjort. Testene går gjennom hele kjeden:
// React-klient → Express-tjener → MySQL-database.
//
// webServer under starter løsningen før testene kjøres, på samme måte som
// på Heroku: klienten bygges (npm run build), og Express leverer både
// klienten og API-et på http://localhost:3030.

const PORT = 3030;

export default defineConfig({
  testDir: "./e2e",

  // Testene i hver fil kjøres etter hverandre, men filene kan kjøres i parallell.
  fullyParallel: false,

  // På en byggetjener (CI) prøver vi en feilet test én gang til, og
  // nekter å kjøre hvis noen har glemt test.only i koden.
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,

  // Rapport: liste i terminalen + en HTML-rapport (åpnes med npx playwright show-report).
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Tar opp et "spor" (trace) med skjermbilder og nettverkstrafikk når en test feiler.
    // Se det med: npx playwright show-trace <fil>, eller i HTML-rapporten.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    command: "npm run build && npm start",
    url: `http://localhost:${PORT}`,
    // Kjører tjeneren allerede (f.eks. npm start i et annet vindu), brukes den.
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
