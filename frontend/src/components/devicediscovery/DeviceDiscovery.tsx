import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { generateRandomDevice } from "../utils/util";

const API_BASE = "http://localhost:8000";

const DeviceDiscovery: React.FC = ({ simulate, setSimulate }: any) => {
  const [towerId, setTowerId] = useState("");
  const [location, setLocation] = useState("");
  const [coverageRadius, setCoverageRadius] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [discoveredDevices, setDiscoveredDevices] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const user = useSelector((state: any) => state.user);

  const handleReset = () => {
    setTowerId("");
    setLocation("");
    setCoverageRadius("");
    setMacAddress("");
    setDiscoveredDevices([]);
    setSearchResult(null);
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, [simulate]);

  const handleSimulateDiscovery = async () => {
    const newDevice = { ...generateRandomDevice(), user }; // generate fresh device
    try {
      await axios.post(`${API_BASE}/api/simulate-device`, newDevice); // use new device
      setSimulate(newDevice); // reflect it in modal or UI
      alert(`Device registered: ${newDevice.ip} / ${newDevice.mac}`);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    }
  };

  const fetchDeviceInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/device-discovery`);
      setDiscoveredDevices(res.data);
    } catch (err) {
      console.error("Discovery failed", err);
    }
  };

  const handleSearch = () => {
    const match = discoveredDevices.find(
      (d) => d.ip === towerId || d.mac === macAddress
    );
    console.log("match found", discoveredDevices);
    setSearchResult(match || null);
  };

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Device Discovery Input
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="IP Address"
          variant="outlined"
          value={towerId}
          onChange={(e) => setTowerId(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="MAC Address"
          placeholder="XX:XX:XX:XX:XX:XX"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Vendor"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Model"
          value={coverageRadius}
          onChange={(e) => setCoverageRadius(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button variant="contained" onClick={handleSimulateDiscovery}>
          Simulate Device Registration
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {searchResult && (
        <>
          <Divider sx={{ my: 4 }} />
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Device Found
            </Typography>
            <Typography>IP: {searchResult.ip}</Typography>
            <Typography>MAC: {searchResult.mac}</Typography>
            <Typography>Carrier: {searchResult.carrier}</Typography>
            <Typography>
              {/* Supported OS: {searchResult.supportedOS.join(", ")} */}
            </Typography>
            <Typography>Status: {searchResult.status}</Typography>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default DeviceDiscovery;
