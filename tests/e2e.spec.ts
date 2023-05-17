import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const randomPassword = faker.random.alphaNumeric(8);
const randomEmail = faker.internet.email();
const randomName = faker.internet.userName();
const randomSurname = faker.name.lastName();

test.beforeEach(async ({ page }) => {
  await page.goto("https://nearme-b6f9d.web.app/");
});

test("sign up ", async ({ page }) => {
  await page.pause()
  await page.locator(".createUser").click();
  await page.getByPlaceholder("enter you first name").fill(randomName);
  await page.keyboard.press("Tab");
  await page.getByPlaceholder("enter you last name").fill(randomSurname);
  await page.keyboard.press("Tab");
  await page.getByPlaceholder("name@example.com").fill(randomEmail);
  await page.keyboard.press("Tab");
  await page.getByPlaceholder("Password").fill(randomPassword);
  await page.keyboard.press("Tab");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page).toHaveURL(/map/);
});

test.describe("Sign in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://nearme-b6f9d.web.app/");
  });
  test("sign in", async ({ page }) => {
    await page.getByPlaceholder("name@example.com").fill("elis1386@gmail.com");
    await page.keyboard.press("Tab");
    await page.getByPlaceholder("Password").fill("Elis1234");
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/map/);
  });
});

test.describe("Sign out", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://nearme-b6f9d.web.app/");
  });
  test("sign in", async ({ page }) => {
    await page.getByPlaceholder("name@example.com").fill("elis1386@gmail.com");
    await page.keyboard.press("Tab");
    await page.getByPlaceholder("Password").fill("Elis1234");
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("article").locator("a").first().click();
    await page.getByRole("link", { name: "Sign out" }).click();
    await expect(page).toHaveURL(/sign-in/);
  });
});


test.describe("Favorite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://nearme-b6f9d.web.app/");
  });
  test("check favorite component ", async ({ page }) => {
    await page.getByPlaceholder("name@example.com").fill("elis1386@gmail.com");
    await page.keyboard.press("Tab");
    await page.getByPlaceholder("Password").fill("Elis1234");
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole('link', { name: ' Favorite' }).click();
    await page.locator('div').filter({ hasText: 'National Aquarium Denmarkrating: 4.3Jacob Fortlingsvej 1, Kastrup Delete' }).nth(1).click()
    await expect(page).toHaveURL(/place/id);
  });
});

test.describe("List", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://nearme-b6f9d.web.app/");
  });
  test("check list component logic", async ({ page }) => {
    /* login first */
    await page.getByPlaceholder("name@example.com").fill("elis1386@gmail.com");
    await page.keyboard.press("Tab");
    await page.getByPlaceholder("Password").fill("Elis1234");
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("button", { name: "" }).click();
    /* press sidebar button then list component should show "No places found" */
    expect(page.getByText("No places found")).toBeTruthy();
    await page.getByRole("button", { name: "Close" }).click();
    await page.getByRole("button", { name: "Places" }).click();
    await page.getByText("Bakery").click();
    await page.getByRole("button", { name: "" }).click();
    /* press bakery button then list component should show places and "No places found" text should not be visible */
    await expect(page.getByText("No places found")).not.toBeVisible();
  });
});
