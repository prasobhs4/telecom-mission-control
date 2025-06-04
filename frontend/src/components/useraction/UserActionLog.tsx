import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../utils/util";
import { fetchUserLogs } from "../../store/userlogs/logThunks";
import { RootState, AppDispatch } from "../../store/store";

const UserActionLog: React.FC = () => {
  const [fromDate, setFromDate] = useState("2025-05-31");
  const [toDate, setToDate] = useState("2025-06-01");
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector((state: RootState) => state.logs);
  const [loading, setLoading] = useState(false);

  const handleRetrieveLogs = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const carrier = user.carrier || "AT&T"; // fallback

      await dispatch(fetchUserLogs({ carrier, start: fromDate, end: toDate }));
    } catch (error) {
      console.error("Failed to fetch logs", error);
      alert("Unable to retrieve user logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        User Action Log
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Date Range
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleRetrieveLogs}
              disabled={loading}
            >
              {loading ? "Loading..." : "Retrieve Logs"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User ID</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
              <TableCell>
                <strong>Timestamp</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No logs found for the selected date range.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell>{getUser(log.userId)}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserActionLog;
