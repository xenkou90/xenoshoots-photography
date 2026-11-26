import { expect, test } from "@playwright/test";
import { pagePaths } from "@/data/navigation";
import { siteName, siteUrl } from "@/data/site";

test("robots.txt points crawlers to the sitemap", async ({
  request,
  isMobile,
}) => {
  test.skip(isMobile, "Not browser-specific; one run is enough");

  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(
    `Sitemap: ${new URL("/sitemap.xml", siteUrl).href}`,
  );
});

test("sitemap lists every page", async ({ request, isMobile }) => {
  test.skip(isMobile, "Not browser-specific; one run is enough");

  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  for (const path of pagePaths) {
    expect(xml).toContain(`<loc>${new URL(path, siteUrl).href}</loc>`);
  }
});

test("every page includes the site's structured data", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Not browser-specific; one run is enough");

  for (const path of pagePaths) {
    await page.goto(path);

    const json = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    if (!json) {
      throw new Error(`No structured data found on ${path}`);
    }

    const data = JSON.parse(json);
    expect(data["@context"]).toBe("https://schema.org");
    expect(JSON.stringify(data["@graph"])).toContain(`"name":"${siteName}"`);
  }
});
