import { test, expect } from '@playwright/test'

test.use({ colorScheme: 'dark' })

test.describe('Test Home Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('visits the app root url', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Good Night Tale App'
      })
    ).toBeVisible()
  })
  test('button on home view redirects to next view', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Tell me a tale!' })
    await expect(button).toBeEnabled()
    await button.click()
    await page.getByLabel("Let's get started").waitFor()
    await expect(page.url()).toBe('http://localhost:5173/init')
  })
})

test.describe('Test Initialize Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/init')
  })
  test('header is correctly rendered', async ({ page }) => {
    const logo = await page.getByAltText('logo')
    const heading = await page.getByLabel('Good night tale')
    await expect(logo).toBeVisible()
    await expect(logo).toHaveCSS('margin-right', '15px')
    await expect(heading).toHaveText('Good Night Tale')
  })
  test('Init view heading is correctly rendered', async ({ page }) => {
    const heading = await page.getByLabel("Let's get started")
    await expect(heading).toHaveText("Let's get started!")
    await expect(heading).toHaveCSS('margin-bottom', '40px')
  })
  test('info toast message is shown and rendered correctly', async ({ page }) => {
    const infoToast = await page.locator('[data-test="info-toast"]')
    await expect(infoToast).toBeVisible()
    await expect(infoToast).toHaveCSS('background-color', 'rgb(33, 150, 243)')
    await expect(infoToast).toHaveText(
      'Please add 5 keywords of your choice or choose from the provided list.'
    )
  })
  test('info toast message could be closed', async ({ page }) => {
    const infoToast = await page.locator('[data-test="info-toast"]')
    await expect(infoToast).toBeVisible()
    await page.getByLabel('Close').click()
    await expect(infoToast).not.toBeVisible()
  })
  test('random keywords list is shown', async ({ page }) => {
    const container = await page.locator('[data-test="chip-container"]')
    await expect(container).toBeVisible()
    const chips = await container.locator('.chip').all()
    await expect(chips).toHaveLength(10)
    await expect(container).toHaveCSS('margin-bottom', '40px')
    await expect(container).toHaveCSS('margin-top', '40px')
  })
  test('adding a keyword appears as a chip', async ({ page }) => {
    const input = await page.getByLabel('Keyword')
    await input.fill('foo')
    await input.press('Enter')
    await expect(page.locator('[data-test="selected"]').locator('.chip').first()).toHaveText('foo')
  })
  test('selecting from random words list is shown as a chip', async ({ page }) => {
    const chips = await page.locator('[data-test="chip-container"]')
    const first = await chips.locator('.chip').first()
    const text = await first.textContent()
    await first.click()
    await expect(page.locator('[data-test="selected"]').locator('.chip').first()).toHaveText(
      text as string
    )
  })
  test('random words could be regenerated', async ({ page }) => {
    const wordsBefore = await page.locator('[data-test="chip-container"]').textContent()
    await page.locator('[data-test="regenerate-words"]').click()
    const wordsAfter = await page.locator('[data-test="chip-container"]').textContent()
    await expect(wordsBefore).not.toEqual(wordsAfter)
  })
  test('only 5 keywords can be added', async ({ page }) => {
    const input = await page.getByLabel('Keyword')
    await input.fill('foo')
    await input.press('Enter')
    await input.fill('bar')
    await input.press('Enter')
    await input.fill('baz')
    await input.press('Enter')
    await input.fill('foobar')
    await input.press('Enter')
    await input.fill('foobarbaz')
    await input.press('Enter')
    await expect(input).toBeDisabled()
  })
  test('selected chips can be removed from the list', async ({ page }) => {
    const input = await page.getByLabel('Keyword')
    await input.fill('foo')
    await input.press('Enter')
    const selected = await page.locator('[data-test="selected"]')
    let chips = await selected.locator('.chip').all()
    await expect(chips).toHaveLength(1)
    await page.locator('[data-test="selected"]').locator('.chip').getByLabel('Close').click()
    chips = await selected.locator('.chip').all()
    await expect(chips).toHaveLength(0)
  })
  test('a warning is shown when the same word is selected', async ({ page }) => {
    const input = await page.getByLabel('Keyword')
    await input.fill('foo')
    await input.press('Enter')
    await input.fill('foo')
    await input.press('Enter')
    await expect(page.getByRole('alert').nth(2)).toBeVisible()
  })
  test('button is disabled until 5 keywords are selected', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Generate Tale' })
    await expect(button).toBeDisabled()
  })
  test('header is shown', async ({ page }) => {
    await expect(page.locator('[data-test="header"]')).toBeVisible()
  })
  test('button is enabled after 5 keywords are selected', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Generate Tale' })
    await expect(button).toBeDisabled()
    const input = await page.getByLabel('Keyword')
    await input.fill('foo')
    await input.press('Enter')
    await input.fill('bar')
    await input.press('Enter')
    await input.fill('baz')
    await input.press('Enter')
    await input.fill('foobar')
    await input.press('Enter')
    await input.fill('foobarbaz')
    await input.press('Enter')
    await expect(button).toBeEnabled()
  })
})

test.describe('Test Content Screen', () => {
  test('fallback message is shown when localStorage empty', async ({ page }) => {
    await page.goto('/content')
    await expect(page.locator('[data-test="fallback-msg"]')).toHaveText('There is nothing to show.')
    await expect(page.locator('[data-test="home-link"]')).toHaveText('Home')
  })
})
