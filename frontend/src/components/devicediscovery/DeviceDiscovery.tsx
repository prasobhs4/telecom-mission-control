import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Chip,
} from "@mui/material";

const CARRIER_OPTIONS = ["AT&T", "Verizon", "T-Mobile"];
const OS_OPTIONS = ["iOS", "Android", "Windows"];
const TOWER_TYPES = ["Monopole", "Lattice", "Guyed"];

const DeviceDiscovery: React.FC = () => {
  const [towerId, setTowerId] = useState("");
  const [location, setLocation] = useState("");
  const [towerType, setTowerType] = useState("Monopole");
  const [installationDate, setInstallationDate] = useState("");
  const [coverageRadius, setCoverageRadius] = useState("");
  const [carriers, setCarriers] = useState<string[]>([]);
  const [supportedOS, setSupportedOS] = useState<string[]>([
    "iOS",
    "Android",
    "Windows",
  ]);

  const handleCarrierToggle = (carrier: string) => {
    setCarriers((prev) =>
      prev.includes(carrier)
        ? prev.filter((c) => c !== carrier)
        : [...prev, carrier]
    );
  };

  const handleOSToggle = (os: string) => {
    setSupportedOS((prev) =>
      prev.includes(os) ? prev.filter((o) => o !== os) : [...prev, os]
    );
  };

  const handleReset = () => {
    setTowerId("");
    setLocation("");
    setTowerType("Monopole");
    setInstallationDate("");
    setCoverageRadius("");
    setCarriers([]);
    setSupportedOS(["iOS", "Android", "Windows"]);
  };

  const handleSubmit = () => {
    const formData = {
      towerId,
      location,
      towerType,
      installationDate,
      coverageRadius,
      carriers,
      supportedOS,
    };
    console.log("Submitting:", formData);
    // POST this to an API endpoint here
  };

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: "1000px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Device Discovery Input
      </Typography>

      <Grid size={8}>
        <TextField
          fullWidth
          label="IP Address"
          variant="outlined"
          value={towerId}
          onChange={(e) => setTowerId(e.target.value)}
        />

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Vendor"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Model"
              value={coverageRadius}
              onChange={(e) => setCoverageRadius(e.target.value)}
            />
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mac Address"
              placeholder="XX-XX-XX-XX-XX-XX-X"
              value={coverageRadius}
              onChange={(e) => setCoverageRadius(e.target.value)}
              InputLabelProps={{ shrink: false }}
            />
          </Grid>
        </Box>

        <Grid item xs={12} sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Discovery
          </Button>
          <Button variant="outlined" color="primary" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceDiscovery;
