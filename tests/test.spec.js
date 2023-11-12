const { test, expect } = require("@playwright/test");
const userData = require("../user.js")

test("Success login test", async ({ page }) => {
  // Go to sign in page/
  await page.goto("https://netology.ru/?modal=sign_in");

  /* Сначала вводим пароль, т.к. при загрузке страницы в DOM
  есть неотображаемое поле ввода email, индентичное полю ввода для логина,
  поэтому ожидая сначал поле ввода пароля мы дождемся полной загрузки формы входа */

  // Fill the user data
  await page.fill("input[type=password]", userData.password);
  await page.fill("input[type=email]", userData.email);

  // Click to submit button
  await page.click("button[data-testid='login-submit-btn']")

  //Check page opening
  await expect(page.locator("h2")).toHaveText("Моё обучение");
});

test("Not exist user login test", async ({ page }) => {
  // Go to sign in page/
  await page.goto("https://netology.ru/?modal=sign_in");

  // Fill in the form with invalid email
  await page.fill("input[type=password]", "1234567890");
  await page.fill("input[type=email]", "notexist@user.io");

  // Click to submit button
  await page.click("button[data-testid='login-submit-btn']")

  //Check the error message text
  await expect(page.locator("div[data-testid='login-error-hint']")).toHaveText("Вы ввели неправильно логин или пароль");
});

test("Bad password login test", async ({ page }) => {
  // Go to sign in page/
  await page.goto("https://netology.ru/?modal=sign_in");

  // Fill in the form with valid email and invalid password
  await page.fill("input[type=password]", "1234567890");
  await page.fill("input[type=email]", userData.email);

  // Click to submit button
  await page.click("button[data-testid='login-submit-btn']")

  //Check the error message text
  await expect(page.locator("div[data-testid='login-error-hint']"))
  .toHaveText("Вы ввели неправильно логин или пароль");
});