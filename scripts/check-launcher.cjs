// npm run check:launcher builds first; this script owns its preview lifecycle.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const { preview } = await import('astro');
  const server = process.env.PREVIEW_URL ? null : await preview({ server: { host: '127.0.0.1', port: 0, open: false } });
  const url = process.env.PREVIEW_URL || `http://127.0.0.1:${server.port}/`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL } : {}) });
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
      const firstLink = list.getByRole('link').first();
      const expectedHref = await firstLink.getAttribute('href');
      const query = await firstLink.getAttribute('data-search');
      assert(query && expectedHref, 'A destination must provide search text and a URL');
      const searchLengths = await list.getByRole('link').evaluateAll(nodes => nodes.map(el => (el.dataset.search || '').length));
      await input.fill(query);
      await page.waitForFunction(() => document.getElementById('launcher-status').textContent === '1 destination');
      assert.equal(await list.getByRole('link').count(), 1);
      await input.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), expectedHref);
      await page.keyboard.press('Escape');
      assert(await input.evaluate(el => document.activeElement === el));
      await input.fill('x'.repeat(Math.max(...searchLengths) + 1));
      assert.equal(await list.getByRole('link').count(), 0);
      await page.waitForFunction(() => document.getElementById('launcher-status').textContent === '0 destinations');
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
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      for (const theme of ['dark', 'light']) {
        await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), theme);
        // A theme toggle transitions text and backgrounds separately. Scan the
        // settled theme, not an intermediate light-text/dark-background frame.
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (let pass = 0; pass < 10; pass++) {
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            const animations = document.getAnimations().filter(animation =>
              animation.playState === 'running' && Number.isFinite(animation.effect?.getComputedTiming().endTime));
            if (!animations.length) return;
            await Promise.all(animations.map(animation => animation.finished.catch(error => {
              if (error.name !== 'AbortError') throw error; // Replaced transitions are inspected on the next pass.
            })));
          }
          throw new Error('Theme animations did not settle before the axe scan');
        });
        const result = await page.evaluate(() => axe.run());
        console.log({ width, theme, axeViolations: result.violations.map(({ id }) => id) });
        assert.equal(result.violations.length, 0, JSON.stringify(result.violations));
      }
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
  } finally {
    try { await browser?.close(); } finally { await server?.stop(); }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
