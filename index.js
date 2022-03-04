const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const urls = require("./FilteredData");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(urls.length);

  for (i = 0; i < urls.length; i++) {
    const url = urls[i];
    const imgPage = await page.goto(`${url.items.info.thumbnail}`);
    await fs.writeFile(`${url.items.info.title}.png`, await imgPage.buffer());
    console.log(url.items.info.thumbnail);
  }

  await browser.close();
}

start();
