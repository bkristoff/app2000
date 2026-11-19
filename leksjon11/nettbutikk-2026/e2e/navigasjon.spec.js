// Ende-til-ende-tester med Playwright: navigasjon, språk og tema.
//
// page er en fane i en ekte nettleser. Vi finner elementer omtrent slik en bruker
// ville gjort: via rolle og synlig tekst (getByRole, getByText), ikke via CSS-klasser.
// Da tåler testene at utseendet endres, så lenge siden fungerer likt for brukeren.
//
// expect(...) venter automatisk (opptil 5 sekunder) til betingelsen er oppfylt.
// Vi trenger derfor ikke å vente selv på at fetch-kall eller språkfiler er ferdige.
//
// Hver test får en "fersk" nettleser (ny context): ingen cookies eller localStorage
// fra andre tester.

import { test, expect } from "@playwright/test";

test("forsiden vises, og lenken tar oss til nettbutikken", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Hobbyhuset");
  await expect(page.getByRole("heading", { name: "Velkommen til Hobbyhuset" })).toBeVisible();

  await page.getByRole("link", { name: "Gå til butikken" }).click();

  await expect(page).toHaveURL("/butikk");
  await expect(page.getByRole("heading", { name: "Nettbutikken", level: 1 })).toBeVisible();
});

test("menyen navigerer mellom sidene", async ({ page }) => {
  await page.goto("/");
  const meny = page.getByRole("navigation");

  await meny.getByRole("link", { name: "Om" }).click();
  await expect(page.getByRole("heading", { name: "Om oss" })).toBeVisible();

  await meny.getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL("/faq");

  await meny.getByRole("link", { name: "Hjem" }).click();
  await expect(page.getByRole("heading", { name: "Velkommen til Hobbyhuset" })).toBeVisible();
});

test("ukjent adresse viser 404-siden fra React", async ({ page }) => {
  await page.goto("/finnes-ikke");

  await expect(page.getByRole("heading", { name: /Nettsiden finnes ikke/ })).toBeVisible();
});

test("varelisten hentes fra API-et og vises som kort", async ({ page }) => {
  await page.goto("/butikk");

  // Teksten "161 varer" kommer fra GET /varer (antallet avhenger av databasen)
  await expect(page.getByText(/^\d+ varer$/)).toBeVisible();
  await expect(page.getByText("VNr: 10820")).toBeVisible();
});

test("språkknappen bytter til engelsk, og valget huskes etter omlasting", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to Hobbyhuset" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.reload(); // Som å trykke F5
  await expect(page.getByRole("heading", { name: "Welcome to Hobbyhuset" })).toBeVisible();
});

test("mørk modus slås på, og valget huskes etter omlasting", async ({ page }) => {
  await page.goto("/");
  const mørkRamme = page.locator("div.dark"); // Layout setter klassen "dark" i mørk modus

  await expect(mørkRamme).toHaveCount(0);
  await page.getByRole("button", { name: "Bytt til mørk modus" }).click();
  await expect(mørkRamme).toHaveCount(1);

  await page.reload();
  await expect(mørkRamme).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Bytt til lys modus" })).toBeVisible();
});
