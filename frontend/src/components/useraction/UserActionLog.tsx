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

type LogEntry = {
  userId: string;
  action: string;
  timestamp: string;
};

const mockLogs: LogEntry[] = [
  {
    userId: "USR927364",
    action: "Blocked Restricted App",
    timestamp: "2025-06-01 08:15:22",
  },
  {
    userId: "USR583019",
    action: "New IMEI ID",
    timestamp: "2025-06-01 08:17:05",
  },
  {
    userId: "USR143827",
    action: "Device block due to jailbreak",
    timestamp: "2025-06-01 08:18:41",
  },
  {
    userId: "USR712648",
    action: "Authorized App Download",
    timestamp: "2025-06-01 08:22:16",
  },
  {
    userId: "USR364910",
    action: "Authorized App Download",
    timestamp: "2025-06-01 08:25:30",
  },
  {
    userId: "USR825137",
    action: "Authorized App Download",
    timestamp: "2025-06-01 08:27:54",
  },
  {
    userId: "USR209476",
    action: "Authorized App Download",
    timestamp: "2025-06-01 08:29:11",
  },
  {
    userId: "USR491058",
    action: "File Upload blocked",
    timestamp: "2025-06-01 08:31:42",
  },
  {
    userId: "USR638210",
    action: "GeoFencing Enabled",
    timestamp: "2025-06-01 08:32:30",
  },
];

const UserActionLog: React.FC = () => {
  const [fromDate, setFromDate] = useState("2025-05-31");
  const [toDate, setToDate] = useState("2025-06-01");
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);

  const handleRetrieveLogs = () => {
    // Normally you'd fetch logs via API based on date range.
    console.log("Fetching logs between", fromDate, "and", toDate);
    // Here we just keep mock data
    setLogs(mockLogs);
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
            <Button variant="contained" onClick={handleRetrieveLogs}>
              Retrieve Logs
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
            {logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell>{log.userId}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserActionLog;
