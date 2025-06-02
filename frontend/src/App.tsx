import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { API_BASE } from "./constants/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import { CssBaseline } from "@mui/material";
import { getCarrierDetails } from "./components/utils/util";
import { useDispatch } from "react-redux";
import { setDashboardData } from "./store/dashboard/dashboardActions";
import TowerRegistrationForm from "./components/registration/TowerRegistrationForm";
import DeviceDiscovery from "./components/devicediscovery/DeviceDiscovery";
import PolicySetupForm from "./components/policysetup/PolicySetupForm";
import UserActionLog from "./components/useraction/UserActionLog";

const App = () => {
  const user = useSelector((state: any) => state.user);
  const carrier = getCarrierDetails(user);
  const dispatch = useDispatch();

  const fetchApi = async (carrier: string) => {
    const response = await axios.get(`${API_BASE}/towers`, {
      params: {
        carrier,
      },
    });
    dispatch(setDashboardData(response));
  };

  useEffect(() => {
    if (carrier) fetchApi(carrier);
  }, [carrier]);

  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/tower-registration-form"
            element={<TowerRegistrationForm />}
          />
          <Route path="/device-discovery-input" element={<DeviceDiscovery />} />
          <Route path="/policy-setup" element={<PolicySetupForm />} />
          <Route path="/user-action-log" element={<UserActionLog />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
