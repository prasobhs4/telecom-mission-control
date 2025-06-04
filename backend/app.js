const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const app = express();
const PORT = 8000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const formatTimestamp = () => {
  const now = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

app.get("/api/dashboard", async (req, res) => {
  const { carrier } = req.query;
  if (!carrier)
    return res.status(400).json({ error: "Carrier is required" });

  let master;
  try {
    master = JSON.parse(
      await fs.readFile("../models/master.json", "utf-8")
    );
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
    const towers = JSON.parse(
      await fs.readFile("../models/towers.json", "utf-8")
    );
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
    const towers = JSON.parse(await fs.readFile("../models/towers.json", "utf8"));
    const master = JSON.parse(await fs.readFile("../models/master.json", "utf8"));

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

  await fs.writeFile("../models/master.json", JSON.stringify(master, null, 2));

  const updatedTowers = towers.filter((t) => t.towerId !== towerData.towerId);
  await fs.writeFile(
    "../models/towers.json",
    JSON.stringify(updatedTowers, null, 2)
  );

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

  const devs = JSON.parse(
    await fs.readFile("../models/devicediscovery.json", "utf8")
  );
  const master = JSON.parse(await fs.readFile("../models/master.json", "utf8"));

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
  await fs.writeFile(
    "../models/devicediscovery.json",
    JSON.stringify(devs, null, 2)
  );

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

  await fs.writeFile("../models/master.json", JSON.stringify(master, null, 2));

  res.status(200).json({ message: "Device registered successfully" });
});

app.get("/api/device-discovery", async (req, res) => {
  const discoveryData = JSON.parse(
    await fs.readFile("../models/devicediscovery.json", "utf8")
  );
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
    const master = JSON.parse(
      await fs.readFile("../models/master.json", "utf8")
    );

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

    await fs.writeFile("../models/master.json", JSON.stringify(master, null, 2));
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
    const master = JSON.parse(await fs.readFile("../models/master.json", "utf8"));
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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
