import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static pdf HTML
app.use("/pdf", express.static(path.join(__dirname, "pdf")));

app.get("/api/export-report", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Load the static pdfExp.html page
    await page.goto(`http://localhost:5000/pdfExp.html`, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    });
    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
