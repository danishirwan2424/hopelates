const puppeteer = require("puppeteer");

module.exports = async function generatePdf() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Render your React printable page
  await page.goto("http://localhost:5000/pdf-export", {
    waitUntil: "networkidle0",
  });

  // Create PDF
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();
  return pdf;
};
