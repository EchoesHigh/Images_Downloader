const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const urls = require("./ScrapedData");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(urls.length);

  for (i = 0; i < urls.length; i++) {
    const url = urls[i];
    // console.log(
    //   `${url.items.info.thumbnail}`
    //     .replace("/200/", `/${url.items.info.original_dimensions.width}/`)
    //     .replace("/200?", `/${url.items.info.original_dimensions.height}?`)
    // );
    // const imgPage = await page.goto(`${url.items.info.thumbnail}`);
    const imgPage = await page.goto(
      `${url.items.info.thumbnail}`
        .replace("/200/", `/${url.items.info.original_dimensions.width}/`)
        .replace("/200?", `/${url.items.info.original_dimensions.height}?`)
    );
    await fs.writeFile(`${url.items.info.title}.png`, await imgPage.buffer());
    console.log(url.items.info.thumbnail);
  }

  await browser.close();
}

start();
