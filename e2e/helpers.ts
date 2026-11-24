import { expect, type Page } from "@playwright/test";
import { galleryPhotos } from "@/data/photos";

export async function openGalleryPage(page: Page) {
  await page.goto("/gallery");
  const photos = page.getByRole("button", { name: /^View larger:/ });
  await expect(photos).toHaveCount(galleryPhotos.length);
  return photos;
}

export function getLightbox(page: Page) {
  return page.getByRole("dialog", { name: "Photo viewer" });
}

export async function openContact(page: Page, isMobile: boolean) {
  await page.goto("/");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await menu.getByRole("button", { name: "Contact" }).click();
    await expect(menu).toBeHidden();
  } else {
    await page
      .getByRole("navigation", { name: "Social and contact" })
      .getByRole("button", { name: "Contact" })
      .click();
  }

  const contact = page.getByRole("dialog", { name: "Contact" });
  await expect(contact).toBeVisible();
  return contact;
}
