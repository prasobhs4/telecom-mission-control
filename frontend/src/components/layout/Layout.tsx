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
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserName } from "../utils/util";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state);
  const username = getUserName(user);

  const handleLogout = () => {
    navigate("/");
  };

  const handleUpgrade = () => {
    alert("Upgrade to Premium clicked!");
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
            <Button color="inherit" onClick={handleUpgrade}>
              Upgrade to Premium
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
    </Box>
  );
};

export default Layout;
