import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserName } from "../utils/util";
import { upgradeAccount } from "../../store/premium/premiumThunks";
import { fetchDashboard } from "../../store/dashboard/dashboardThunks";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, premium } = useSelector((state: any) => state);
  const username = getUserName(user);
  const isPremium = premium.upgraded;

  const [applyOpen, setApplyOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleUpgrade = async () => {
    if (isPremium) return;
    setApplyOpen(true);
    try {
      await dispatch(upgradeAccount(user.carrier || "AT&T"));
      await dispatch(fetchDashboard(user.carrier || "AT&T"));
      setApplyOpen(false);
      setSuccessOpen(true);
    } catch (err) {
      setApplyOpen(false);
      console.error(err);
    }
  };

  if (isLoginPage) return <>{children}</>;

  return (
    <Box sx={{ display: "flex", fontFamily: "Roboto, sans-serif" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            NetCONNECT
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="h9"
              style={{ fontSize: "12px", padding: "10px" }}
            >{`Hi , ${username?.toUpperCase()}`}</Typography>
            <Button color="inherit" onClick={handleUpgrade} disabled={isPremium}>
              {isPremium ? "Premium User" : "Upgrade to Premium"}
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            "Dashboard",
            "Tower Registration Form",
            "Device Discovery Input",
            "Policy Setup",
            "User Action Log",
          ].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f4f6f8", minHeight: "100vh", p: 4 }}
      >
        <Toolbar />
        {children}
      </Box>
      <Dialog open={applyOpen}>
        <DialogTitle>Applying security fixes...</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Upgraded to Premium</DialogTitle>
      </Dialog>
    </Box>
  );
};

export default Layout;
