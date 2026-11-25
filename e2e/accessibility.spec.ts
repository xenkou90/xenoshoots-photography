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
    elements: violation.nodes.map((node) => ({
      element: node.target.join(" "),
      details: node.failureSummary,
    })),
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

  const lightbox = getLightbox(page);
  await expect(lightbox).toBeVisible();
  await expect(lightbox).toHaveCSS("opacity", "1");
  await expectNoViolations(page);
});

test("open contact modal has no detectable accessibility violations", async ({
  page,
  isMobile,
}) => {
  const contact = await openContact(page, isMobile);
  await expect(contact).toHaveCSS("opacity", "1");
  await expectNoViolations(page);
});
