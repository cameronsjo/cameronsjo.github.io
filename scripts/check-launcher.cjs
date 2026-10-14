// Run against npm run preview with Playwright available via NODE_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4121/';
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.route('https://**', route => route.abort());
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const input = page.getByRole('textbox', { name: 'Filter destinations' });
      const list = page.getByRole('list', { name: 'Destinations' });
      await input.waitFor();
      // Optional negative control: the assertion must reject the old widget role.
      if (process.env.KNOWN_BAD) await input.evaluate(el => el.setAttribute('role', 'combobox'));
      assert.equal(await page.locator('[role="combobox"], [role="listbox"], [role="option"], [aria-activedescendant], [aria-selected]').count(), 0);
      const total = await list.getByRole('link').count();
      assert(total > 0);
      await input.fill('blog notes');
      await page.waitForFunction(() => document.getElementById('launcher-status').textContent === '1 destination');
      assert.equal(await list.getByRole('link').count(), 1);
      await input.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '/blog');
      await page.keyboard.press('Escape');
      assert(await input.evaluate(el => document.activeElement === el));
      await input.fill('zzzzzzzzzz');
      assert.equal(await list.getByRole('link').count(), 0);
      assert.equal(await page.getByRole('status').textContent(), '0 destinations');
      await input.press('Escape');
      assert.equal(await list.getByRole('link').count(), total);
      await input.press('ArrowDown');
      const first = await page.evaluate(() => document.activeElement.getAttribute('href'));
      await page.keyboard.press('ArrowDown');
      const second = await page.evaluate(() => document.activeElement.getAttribute('href'));
      assert.notEqual(first, second);
      await page.keyboard.press('ArrowUp');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), first);
      await page.keyboard.press('ArrowUp');
      assert(await input.evaluate(el => document.activeElement === el));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      console.log({ width, total, keyboardFocus: true, emptyState: true, overflow: false });
      await page.close();
    }
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('[role="option"]').count(), 0);
    const hrefs = await page.locator('#launcher-list a').evaluateAll(nodes => nodes.map(el => el.getAttribute('href')));
    assert(hrefs.length > 0 && hrefs.every(Boolean));
    console.log({ noJavaScriptLinks: hrefs.length });
    await context.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
