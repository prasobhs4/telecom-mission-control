import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchDevices, simulateDevice } from "../../store/device/deviceThunks";
import { generateRandomDevice } from "../utils/util";

const DeviceDiscovery: React.FC = () => {
  const [towerId, setTowerId] = useState("");
  const [location, setLocation] = useState("");
  const [coverageRadius, setCoverageRadius] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const discoveredDevices = useSelector((state: any) => state.device.discovered);
  const simulate = useSelector((state: any) => state.device.simulated);

  const handleReset = () => {
    setTowerId("");
    setLocation("");
    setCoverageRadius("");
    setMacAddress("");
    setSearchResult(null);
    dispatch(fetchDevices());
  };

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch, simulate]);

  const handleSimulateDiscovery = async () => {
    const newDevice = { ...generateRandomDevice(), user };
    dispatch(simulateDevice(newDevice));
    alert(`Device registered: ${newDevice.ip} / ${newDevice.mac}`);
  };


  const handleSearch = () => {
    const match = discoveredDevices.find(
      (d) => d.ip === towerId || d.mac === macAddress
    );
    setSearchResult(match || null);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 6 }, py: 4, maxWidth: "600px", margin: "0 auto" }}>
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
            <Typography>Status: {searchResult.status}</Typography>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default DeviceDiscovery;
