const puppeteer = require("puppeteer");
const ejs = require("ejs");

/**
 * Calling pdf render api, which renders pdf file in a browser page
 */
async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    product: "chrome",
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  const URL = `http://localhost:${process.env.PORT}/render-pdf`;
  console.log("URL ", URL);
  await page.goto(URL, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();
  return pdf;
}

async function generatePDF(req, res) {
  try {
    const pdfData = await printPDF();

    const base64data = Buffer.from(pdfData, "binary").toString("base64");
    ejs.renderFile(
      "views/pdf-template.ejs",
      { pdfData: base64data },
      (err, html) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          res.status(500).send("Error rendering PDF template");
        } else {
          // Send the rendered HTML containing the PDF data
          res.send(html);
        }
      }
    );
  } catch (error) {
    throw error;
  }
}

module.exports = generatePDF;
