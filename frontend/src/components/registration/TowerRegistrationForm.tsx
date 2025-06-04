import React, { useState, useEffect } from "react";
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
  Autocomplete,
  Snackbar,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const CARRIER_OPTIONS = ["AT&T", "Verizon", "T-Mobile"];
const OS_OPTIONS = ["iOS", "Android", "Windows"];
const TOWER_TYPES = ["Monopole", "Lattice", "Guyed"];

const TowerRegistrationForm: React.FC = ({ towerList, setTowerList }: any) => {
  const [id, setTowerId] = useState("");

  const [location, setLocation] = useState("");
  const [towerType, setTowerType] = useState("Monopole");
  const [installationDate, setInstallationDate] = useState("");
  const [coverageRadius, setCoverageRadius] = useState("");
  const [carriers, setCarriers] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [supportedOS, setSupportedOS] = useState<string[]>([
    "iOS",
    "Android",
    "Windows",
  ]);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchTowers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/towers");
        const ids = response.data.map((t: any) => t.towerId);
        setTowerList(ids);
      } catch (error) {
        console.error("Failed to fetch towers", error);
      }
    };
    fetchTowers();
  }, []);

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
      id,
      location,
      towerType,
      installationDate,
      coverageRadius,
      carriers,
      supportedOS,
    };
    const registerTower = async () => {
      try {
        await axios.post("http://localhost:8000/api/register-tower", {
          ...formData,
          user,
        });
        setSnackbarOpen(true);
        setTowerList((prev) => prev.filter((t) => t.id !== id));
        setTowerId("");
      } catch (error) {
        console.error("Failed to register tower", error);
      }
    };
    registerTower();
  };

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: "1000px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Register a New Tower
      </Typography>

      <Grid size={8}>
        <Autocomplete
          options={towerList}
          value={id}
          onChange={(event: any, newValue: string | null) => {
            setTowerId(newValue || "");
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              fullWidth
              label="Tower ID"
              variant="outlined"
              value={id}
              onClick={(e) => setTowerId(e.target.value)}
            />
          )}
        />
        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel>Tower Type</InputLabel>
              <Select
                value={towerType}
                onChange={(e) => setTowerType(e.target.value)}
                label="Tower Type"
              >
                {TOWER_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Installation Date"
              value={installationDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setInstallationDate(e.target.value)}
            />
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Supported Carriers
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {CARRIER_OPTIONS.map((carrier) => (
                <Chip
                  key={carrier}
                  label={carrier}
                  clickable
                  onClick={() => handleCarrierToggle(carrier)}
                  variant={carriers.includes(carrier) ? "filled" : "outlined"}
                  color={carriers.includes(carrier) ? "primary" : "default"}
                />
              ))}
            </Box>
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Coverage Radius"
              value={coverageRadius}
              onChange={(e) => setCoverageRadius(e.target.value)}
              InputProps={{
                endAdornment: <span style={{ marginLeft: 4 }}>miles</span>,
              }}
            />
          </Grid>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Supported OS
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              {OS_OPTIONS.map((os) => (
                <FormControlLabel
                  key={os}
                  control={
                    <Checkbox
                      checked={supportedOS.includes(os)}
                      onChange={() => handleOSToggle(os)}
                    />
                  }
                  label={os}
                />
              ))}
            </Box>
          </Grid>
        </Box>

        <Grid item xs={12} sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            REGISTER
          </Button>
          <Button variant="outlined" color="primary" onClick={handleReset}>
            RESET
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tower Registered Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TowerRegistrationForm;
