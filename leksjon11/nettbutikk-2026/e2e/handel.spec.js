// Ende-til-ende-tester med Playwright: innlogging, registrering og bestilling.
//
// Disse testene går hele veien fra nettleseren til databasen. De krever at
// databasen er satt opp (se README), og at tjeneren får kontakt med den.
//
// Testene registrerer egne testkunder med e-post e2e-<tall>@eksempel.no.
// Etter testene slettes kundene og ordrene deres igjen (test.afterAll).

import { test, expect } from "@playwright/test";
import { slettTestkunder } from "./opprydding.js";

test.afterAll(async () => {
  await slettTestkunder();
});

// Hjelpefunksjon som fyller ut og sender registreringsskjemaet.
// Returnerer e-posten til den nye kunden.
async function registrerNyKunde(page) {
  const epost = `e2e-${Date.now()}@eksempel.no`;

  await page.goto("/butikk");
  await page.getByRole("button", { name: "Registrer deg her" }).click();

  await page.getByPlaceholder("Fornavn").fill("Playwright");
  await page.getByPlaceholder("Etternavn").fill("Testesen");
  await page.getByPlaceholder("E-post").fill(epost);
  await page.getByPlaceholder("Passord (minst 8 tegn)").fill("hemmelig123");
  await page.getByPlaceholder("Adresse").fill("Testveien 1");
  await page.getByPlaceholder("Postnummer").fill("3800");
  await page.getByRole("button", { name: "Registrer", exact: true }).click();

  await expect(page.getByText(`Innlogget som Playwright Testesen (${epost})`)).toBeVisible();
  return epost;
}

test("feil passord gir en feilmelding", async ({ page }) => {
  await page.goto("/butikk");

  await page.getByPlaceholder("E-post").fill("finnes.ikke@eksempel.no");
  await page.getByPlaceholder("Passord").fill("feil-passord");
  await page.getByRole("button", { name: "Logg inn" }).click();

  await expect(page.getByRole("alert")).toHaveText("Feil e-post eller passord.");
  // Innloggingsskjemaet vises fortsatt
  await expect(page.getByRole("heading", { name: "Innlogging" })).toBeVisible();
});

test("ny kunde kan registrere seg, handle og logge ut", async ({ page }) => {
  // test.step deler testen opp i navngitte steg, som vises i rapporten.
  await test.step("registrer ny kunde", async () => {
    await registrerNyKunde(page);
  });

  const handlekurv = page.getByRole("heading", { name: /Handlekurv for/ }).locator("..");

  await test.step("legg en vare som allerede er i kurven, i kurven", async () => {
    // Handlekurven starter med 3 stk. av vare 10820 (hardkodet i Butikk.jsx)
    await expect(handlekurv.getByText("3 stk. av vare 10820")).toBeVisible();

    await page.getByPlaceholder("VNr").fill("10820");
    await page.getByPlaceholder("Antall").fill("2");
    await page.getByRole("button", { name: "Legg i handlekurv" }).click();

    // Samme vare skal gi høyere antall, ikke en ny linje
    await expect(handlekurv.getByText("5 stk. av vare 10820")).toBeVisible();
    await expect(handlekurv.getByText(/stk\. av vare 10820/)).toHaveCount(1);
  });

  await test.step("ugyldig antall gir feilmelding", async () => {
    await page.getByPlaceholder("Antall").fill("0");
    await page.getByRole("button", { name: "Legg i handlekurv" }).click();

    await expect(page.getByRole("alert")).toHaveText("Antall må være et helt tall større enn 0.");
  });

  await test.step("gå til kassen og lagre ordren", async () => {
    await page.getByRole("button", { name: "Gå til kasse" }).click();

    await expect(page.getByText(/Ordre nr\. \d+ er lagret\. Takk for handelen!/)).toBeVisible();
    // Kurven er tømt, og knappen er deaktivert
    await expect(page.getByRole("button", { name: "Gå til kasse" })).toBeDisabled();
  });

  await test.step("innloggingen overlever omlasting av siden (sesjons-cookie)", async () => {
    await page.reload();
    await expect(page.getByText(/Innlogget som Playwright Testesen/)).toBeVisible();
  });

  await test.step("logg ut", async () => {
    await page.getByRole("button", { name: "Logg ut" }).click();
    await expect(page.getByRole("heading", { name: "Innlogging" })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("heading", { name: "Innlogging" })).toBeVisible();
  });
});

test("en registrert kunde kan logge inn igjen", async ({ page }) => {
  const epost = await registrerNyKunde(page);
  await page.getByRole("button", { name: "Logg ut" }).click();

  await page.getByPlaceholder("E-post").fill(epost);
  await page.getByPlaceholder("Passord").fill("hemmelig123");
  await page.getByRole("button", { name: "Logg inn" }).click();

  await expect(page.getByText(`Innlogget som Playwright Testesen (${epost})`)).toBeVisible();
});
