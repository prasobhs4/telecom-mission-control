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
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  if (isLoginPage) return <>{children}</>;

  return (
    <Box sx={{ display: "flex", fontFamily: "Roboto, sans-serif" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            NetCONNECT
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
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
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => navigate("/registration")}
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
