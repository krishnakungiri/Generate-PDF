const express = require("express");
const path = require("path");
const generatePDF = require("./controllers/generate-pdf");
const renderPDF = require("./controllers/render-pdf");

const app = express();

const port = process.env.PORT ?? 5000;

require("dotenv").config();
app.use(express.json());

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Generate PDF App");
});

app.get("/generate-pdf", generatePDF);
app.get("/render-pdf", renderPDF);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
