import { expect, test } from "@playwright/test";
import { pagePaths } from "@/data/navigation";
import { siteUrl } from "@/data/site";

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
