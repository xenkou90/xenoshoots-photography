import { expect, test } from "@playwright/test";

test("home page shows the hero, which links to the gallery", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Xeno Shoots — Product Photography Portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Xeno Shoots — product photography",
  );

  await page.getByRole("link", { name: /^View the gallery:/ }).click();

  await expect(page).toHaveURL(/\/gallery$/);
  await expect(page).toHaveTitle("Gallery — Xeno Shoots");
});

test("sidebar navigates between pages on desktop", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "The sidebar is only shown on desktop");

  await page.goto("/");
  const mainNav = page.getByRole("navigation", { name: "Main" });

  await mainNav.getByRole("link", { name: "Gallery" }).click();
  await expect(page).toHaveURL(/\/gallery$/);

  await mainNav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveTitle("Xeno Shoots — Product Photography Portfolio");
});

test("mobile menu opens, navigates, and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The menu button is only shown on phones");

  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();

  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();

  await menu.getByRole("link", { name: "Gallery" }).click();

  await expect(page).toHaveURL(/\/gallery$/);
  await expect(menu).toBeHidden();
});
