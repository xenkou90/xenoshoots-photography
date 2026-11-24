import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { getLightbox, openContact, openGalleryPage } from "./helpers";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const violations = results.violations.map((violation) => ({
    rule: violation.id,
    impact: violation.impact,
    problem: violation.help,
    elements: violation.nodes.map((node) => node.target.join(" ")),
  }));

  expect(violations).toEqual([]);
}

test("home page has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  await expectNoViolations(page);
});

test("gallery page has no detectable accessibility violations", async ({
  page,
}) => {
  await openGalleryPage(page);
  await expectNoViolations(page);
});

test("open lightbox has no detectable accessibility violations", async ({
  page,
}) => {
  const photos = await openGalleryPage(page);
  await photos.first().click();
  await expect(getLightbox(page)).toBeVisible();
  await expectNoViolations(page);
});

test("open contact modal has no detectable accessibility violations", async ({
  page,
  isMobile,
}) => {
  await openContact(page, isMobile);
  await expectNoViolations(page);
});
