import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { savePolicy } from "../../store/policy/policyThunks";
import { setPolicyApplied } from "../../store/policy/policyActions";

const POLICY_TYPES = [
  "Administrative",
  "Device Management",
  "Network Security",
  "User Management",
  "Others",
];

const POLICY_TOGGLES = [
  "Allow VPN",
  "Allow Camera",
  "Allow Download",
  "Block Restricted Apps",
  "Block Jailbreak/Root Detection",
];

const PolicySetupForm: React.FC = () => {
  const [policyName, setPolicyName] = useState("");
  const [policyType, setPolicyType] = useState<string>("Device Management");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Allow VPN": false,
    "Allow Camera": false,
    "Allow Download": false,
    "Block Restricted Apps": false,
    "Block Jailbreak/Root Detection": false,
  });
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPolicyApplied(false));
  }, [dispatch]);

  const handleToggleChange = (label: string) => {
    setToggles((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      policyName,
      policyType,
      apply: toggles,
    };

    try {
      await dispatch(
        savePolicy({
          ...payload,
          user: user.username || "admin",
          carrier: user.carrier,
        })
      );
      alert("Policy successfully saved and applied");
    } catch (err) {
      console.error("Failed to save policy", err);
      alert("Error saving policy");
    }
  };

  const handleCancel = () => {
    setPolicyName("");
    setPolicyType("Device Management");
    setToggles(
      Object.fromEntries(POLICY_TOGGLES.map((label) => [label, false]))
    );
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Policy Setup
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>Policy Name</Typography>
        <TextField
          fullWidth
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          placeholder="Enter policy name"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>Policy Type</Typography>
        <ToggleButtonGroup
          exclusive
          value={policyType}
          onChange={(_, newType) => newType && setPolicyType(newType)}
        >
          {POLICY_TYPES.map((type) => (
            <ToggleButton key={type} value={type}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 1 }}>Apply</Typography>
        <Grid container spacing={2}>
          {POLICY_TOGGLES.map((label, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <FormControlLabel
                control={
                  <Switch
                    checked={toggles[label]}
                    onChange={() => handleToggleChange(label)}
                  />
                }
                label={label}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PolicySetupForm;
