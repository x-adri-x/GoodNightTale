import { test, expect } from "@playwright/test";

test.describe("Test Home Screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("visits the app root url", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "The Good Night Tale" }),
    ).toBeVisible();
  });
  test("button on home view redirects to next view", async ({ page }) => {
    const button = await page.getByRole("button", { name: "Tell me a tale!" });
    await expect(button).toBeEnabled();
    await button.click();
    await page.getByRole("heading", { name: "Let's get started!" });
    await expect(page.url()).toBe("http://localhost:5173/init");
  });
});

test.describe("Test Initialize Screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/init");
  });
  test("adding a keyword appears as a chip", async ({ page }) => {
    await expect(page.getByRole("textbox")).toBeVisible();
    await page.getByRole("textbox").fill("keyword-1");
    await page.getByRole("button", { name: "Add keyword" }).click();
    await expect(page.getByTestId("keyword-1")).toBeVisible();
  });
});
