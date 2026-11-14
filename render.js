// Renders index.html to student-dev-perks.pdf at 1920x1080 per slide. Run: node render.js
const path = require('path');
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + path.resolve('index.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.resolve('student-dev-perks.pdf'), width: '1920px', height: '1080px', printBackground: true });
  await browser.close();
})();
