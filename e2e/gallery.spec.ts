import { expect, test } from "@playwright/test";
import { galleryPhotos } from "@/data/photos";
import { getLightbox, openGalleryPage } from "./helpers";

const photoCount = galleryPhotos.length;

test("gallery shows every photo", async ({ page }) => {
  await openGalleryPage(page);
});

test("lightbox moves between photos and wraps around", async ({ page }) => {
  const photos = await openGalleryPage(page);
  await photos.last().click();

  const lightbox = getLightbox(page);
  const position = lightbox.getByText(/^Photo \d+ of \d+/);
  const image = lightbox.getByRole("img");

  await expect(position).toContainText(`Photo ${photoCount} of ${photoCount}:`);

  await page.keyboard.press("ArrowRight");
  await expect(position).toContainText(`Photo 1 of ${photoCount}:`);
  await expect(image).toHaveAttribute("alt", galleryPhotos[0].alt);

  await page.keyboard.press("ArrowLeft");
  await expect(position).toContainText(`Photo ${photoCount} of ${photoCount}:`);

  await lightbox.getByRole("button", { name: "Next photo" }).click();
  await expect(position).toContainText(`Photo 1 of ${photoCount}:`);

  await lightbox.getByRole("button", { name: "Previous photo" }).click();
  await expect(position).toContainText(`Photo ${photoCount} of ${photoCount}:`);
});

test("Escape closes the lightbox and returns focus to the photo", async ({
  page,
}) => {
  const photos = await openGalleryPage(page);
  const fourthPhoto = photos.nth(3);

  await fourthPhoto.focus();
  await page.keyboard.press("Enter");

  const lightbox = getLightbox(page);
  await expect(lightbox).toBeVisible();
  await expect(lightbox.getByRole("button", { name: "Close" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(lightbox).toBeHidden();
  await expect(fourthPhoto).toBeFocused();
});

test("clicking the photo keeps the lightbox open; clicking outside closes it", async ({
  page,
}) => {
  const photos = await openGalleryPage(page);
  await photos.first().click();

  const lightbox = getLightbox(page);
  await expect(lightbox).toBeVisible();

  await lightbox.getByRole("img").click();
  await expect(lightbox).toHaveAttribute("open", "");

  await lightbox.click({ position: { x: 10, y: 10 } });
  await expect(lightbox).toBeHidden();
});

test("the close button closes the lightbox", async ({ page }) => {
  const photos = await openGalleryPage(page);
  await photos.first().click();

  const lightbox = getLightbox(page);
  await lightbox.getByRole("button", { name: "Close" }).click();
  await expect(lightbox).toBeHidden();
});
