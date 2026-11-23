import { expect, test, type Page } from "@playwright/test";
import { contactEmail } from "@/data/site";

async function openContact(page: Page, isMobile: boolean) {
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

test("contact modal shows the email link", async ({ page, isMobile }) => {
  const contact = await openContact(page, isMobile);

  await expect(
    contact.getByRole("link", { name: "Send me an email" }),
  ).toHaveAttribute("href", `mailto:${contactEmail}`);
});

test("contact modal closes with ×, Escape and a click outside, but not a click inside", async ({
  page,
  isMobile,
}) => {
  const contact = await openContact(page, isMobile);
  await contact.getByText("The best way to reach me is by email.").click();
  await expect(contact).toHaveAttribute("open", "");
  await contact.getByRole("button", { name: "Close" }).click();
  await expect(contact).toBeHidden();

  await openContact(page, isMobile);
  await page.keyboard.press("Escape");
  await expect(contact).toBeHidden();

  await openContact(page, isMobile);
  await page.mouse.click(5, 5);
  await expect(contact).toBeHidden();
});

test("closing the contact modal returns focus to the button that opened it", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const contact = page.getByRole("dialog", { name: "Contact" });

  if (isMobile) {
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.focus();
    await page.keyboard.press("Enter");

    const menu = page.getByRole("dialog", { name: "Menu" });
    await menu.getByRole("button", { name: "Contact" }).focus();
    await page.keyboard.press("Enter");
    await expect(contact).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(contact).toBeHidden();
    await expect(menuButton).toBeFocused();
  } else {
    const contactButton = page
      .getByRole("navigation", { name: "Social and contact" })
      .getByRole("button", { name: "Contact" });
    await contactButton.focus();
    await page.keyboard.press("Enter");
    await expect(contact).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(contact).toBeHidden();
    await expect(contactButton).toBeFocused();
  }
});
