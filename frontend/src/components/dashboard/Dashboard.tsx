import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const Dashboard = () => {
  const dashboard = useSelector((state: any) => state.dashboard);

  return (
    <Box sx={{ p: { xs: 2, sm: 5 } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Towers</Typography>
              <Typography>{dashboard.activeTowers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Devices</Typography>
              <Typography>{dashboard.totalDevices.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography>{dashboard.users.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Security Alerts</Typography>
              <Typography color="error">{dashboard.securityAlerts}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={{ xs: 4, sm: 10 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ maxHeight: 400, overflowY: "auto" }}>
            <CardContent>
              <Typography
                style={{ height: "10px", marginBottom: "2rem" }}
                variant="h6"
              >
                Tower Status
              </Typography>
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                  mt: 2,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Tower ID
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.towerStatuses.map((t) => {
                    return (
                      <tr key={t.id}>
                        <td
                          style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          {t.id}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #eee",
                            color: t.status === "ACTIVE" ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {t.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ maxHeight: 400, overflowY: "auto" }}>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <ul style={{ width: "100%", marginTop: "1rem" }}>
                {dashboard.recentActivity.map((a, idx) => (
                  <li key={idx} style={{ marginBottom: "2rem" }}>
                    <strong>{a.timestamp}</strong> - {a.message}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
