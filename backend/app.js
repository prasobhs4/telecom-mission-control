const express = require("express");
const { readJSON, writeJSON } = require("./utils");
const cors = require("cors");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

require("dotenv").config()
const app = express();

const {
  PORT = 8000,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const formatTimestamp = () => new Date().toISOString().replace("T", " ").slice(0, 19);

app.get("/api/dashboard", async (req, res) => {
  const { carrier } = req.query;
  if (!carrier)
    return res.status(400).json({ error: "Carrier is required" });

  let master;
  try {
    master = await readJSON("master.json");
  } catch (err) {
    return res.status(500).json({ error: "Error reading master.json" });
  }
  const filteredCarriers =
    carrier !== "admin"
      ? master.carriers.filter((c) => c.carrierName === carrier)
      : master.carriers;

  const result = filteredCarriers.map((c) => {
    const activeTowersCount = Array.isArray(c.towers)
      ? c.towers.filter((t) => t.status === "ACTIVE").length
      : 0;

    return {
      ...c,
      dashboard: {
        ...c.dashboard,
        activeTowers: activeTowersCount,
      },
    };
  });

  return res.status(200).json(result);
});

app.get("/api/towers", async (req, res) => {
  try {
    const towers = await readJSON("towers.json");
    return res.status(200).json(towers);
  } catch (err) {
    return res.status(500).json({ error: "Error reading towers.json" });
  }
});

// POST register tower
app.post(
  "/api/register-tower",
  [
    body("id", "id is required").notEmpty(),
    body("carriers", "carriers is required").isArray({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const towerData = req.body;
    const towers = await readJSON("towers.json");
    const master = await readJSON("master.json");

  const tower = towers.find((t) => t.towerId === towerData.id);
  if (!tower) return res.status(404).json({ error: "Tower not found" });

  const carrier = master.carriers.find(
    (c) => c.carrierName === towerData.carriers[0]
  );
  if (!carrier) return res.status(404).json({ error: "Carrier not found" });

  const flatList = Array.isArray(carrier.towers[0])
    ? carrier.towers[0]
    : carrier.towers;

  flatList.push({
    ...towerData,
    status: "ACTIVE",
  });

  carrier.recentActivity.unshift({
    timestamp: formatTimestamp(),
    message: `${towerData.id} Registered`,
    by: towerData.user || "admin",
  });

  await writeJSON("master.json", master);

  const updatedTowers = towers.filter((t) => t.towerId !== towerData.towerId);
  await writeJSON("towers.json", updatedTowers);

  res.sendStatus(200);
});

app.post(
  "/api/simulate-device",
  [
    body("ip", "ip is required").notEmpty(),
    body("mac", "mac is required").notEmpty(),
    body("vendor", "vendor is required").notEmpty(),
    body("model", "model is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { ip, mac, vendor, model, user } = req.body;

  const devs = await readJSON("devicediscovery.json");
  const master = await readJSON("master.json");

  const carrierName = user?.carrier || "AT&T";

  const newDevice = {
    ip,
    mac,
    vendor,
    model,
    discoveredAt: new Date().toISOString().replace("T", " ").slice(0, 19),
    status: "available",
    carrier: carrierName,
  };

  devs.push(newDevice);
  await writeJSON("devicediscovery.json", devs);

  const targetCarrier = master.carriers.find(
    (c) => c.carrierName === carrierName
  );
  if (targetCarrier) {
    targetCarrier.dashboard.totalDevices += 1;
    targetCarrier.recentActivity.unshift({
      timestamp: formatTimestamp(),
      message: `Device ${ip} registered`,
      by: user || "admin",
    });
  }

  await writeJSON("master.json", master);

  res.status(200).json({ message: "Device registered successfully" });
});

app.get("/api/device-discovery", async (req, res) => {
  const discoveryData = await readJSON("devicediscovery.json");
  res.status(200).json(discoveryData);
});

// POST /api/policy
app.post(
  "/api/policy",
  [
    body("policyName", "policyName is required").notEmpty(),
    body("policyType", "policyType is required").notEmpty(),
    body("apply", "apply is required").notEmpty(),
    body("user", "user is required").notEmpty(),
    body("carrier", "carrier is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { policyName, policyType, apply, user, carrier } = req.body;

  try {
    const master = await readJSON("master.json");

    const newPolicy = {
      name: policyName,
      type: policyType,
      carrier,
      settings: apply,
      timestamp: new Date().toISOString(),
    };

    // Ensure global policies array exists
    master.policies = master.policies || [];
    master.policies.push(newPolicy);

    // Create activity log entry
    const activityEntry = {
      timestamp: new Date().toLocaleString(),
      message: `Policy "${policyName}" applied to carrier "${carrier}"`,
      by: user,
    };

    if (user === "admin") {
      master.carriers.forEach((c) => {
        c.policy = newPolicy;
        c.recentActivity = c.recentActivity || [];
        c.recentActivity.unshift(activityEntry);

        c.towers.forEach((tower) => {
          tower.policy = newPolicy;
        });
      });
    } else {
      const targetCarrier = master.carriers.find(
        (c) => c.carrierName.toLowerCase() === carrier.toLowerCase()
      );
      if (targetCarrier) {
        targetCarrier.policy = newPolicy;
        targetCarrier.recentActivity = targetCarrier.recentActivity || [];
        targetCarrier.recentActivity.unshift(activityEntry);

        targetCarrier.towers.forEach((tower) => {
          tower.policy = newPolicy;
        });
      }
    }

    master.recentActivity = master.recentActivity || [];
    master.recentActivity.unshift({
      ...activityEntry,
      by: user,
    });

    await writeJSON("master.json", master);
    res.sendStatus(200);
  } catch (err) {
    console.error("Policy update error:", err);
    res.status(500).json({ error: "Failed to apply policy." });
  }
});

app.get("/api/user-logs", async (req, res) => {
  const { carrier, start, end } = req.query;

  if (!carrier || !start || !end) {
    return res
      .status(400)
      .json({ error: "carrier, start, and end dates are required" });
  }

  try {
    const master = await readJSON("master.json");
    const targetCarrier = master.carriers.find(
      (c) => c.carrierName === carrier
    );

    if (!targetCarrier)
      return res.status(404).json({ error: "Carrier not found" });

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); // include full day

    const logs = (targetCarrier.recentActivity || [])
      .filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= startDate && entryDate <= endDate && entry.by;
      })
      .map((entry) => ({
        userId: typeof entry.by === "object" ? entry.by.username : entry.by,
        action: entry.message,
        timestamp: entry.timestamp,
      }));

    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching user logs", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/api/upgrade",
  [body("carrier", "carrier is required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { carrier } = req.body;

    try {
      const master = await readJSON("master.json");
      const targetCarrier = master.carriers.find(
        (c) => c.carrierName === carrier
      );

      if (!targetCarrier)
        return res.status(404).json({ error: "Carrier not found" });

      targetCarrier.dashboard.securityAlerts = 0;

      await writeJSON("master.json", master);

      res.sendStatus(200);
    } catch (err) {
      console.error("Upgrade error:", err);
      res.status(500).json({ error: "Failed to upgrade." });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (DB_HOST) {
    console.log(
      `Database: ${DB_NAME || ""} at ${DB_HOST} as ${DB_USER || ""}`
    );
  }
});
