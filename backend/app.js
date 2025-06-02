const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

let data = { towers: [] };
try {
  data = JSON.parse(fs.readFileSync("../models/master.json", "utf-8"));
  console.log("✅ Loaded master.json successfully");
} catch (err) {
  console.error("Failed to load master.json:", err.message);
}

// Towers endpoint with optional carrier filter
app.get("/api/towers", (req, res) => {
  const { carrier } = req.query;
  console.log(carrier);
  if (!carrier) return res.status(400);
  const filteredCarriers =
    carrier !== "admin"
      ? data.carriers.filter((t) => t.carrierName.includes(carrier))
      : data.carriers;

  return res.status(200).json(filteredCarriers);
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
