import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import { CssBaseline } from "@mui/material";
import { getCarrierDetails } from "./components/utils/util";
import { useDispatch } from "react-redux";
import { fetchDashboard } from "./store/dashboard/dashboardThunks";
import TowerRegistrationForm from "./components/registration/TowerRegistrationForm";
import DeviceDiscovery from "./components/devicediscovery/DeviceDiscovery";
import PolicySetupForm from "./components/policysetup/PolicySetupForm";
import UserActionLog from "./components/useraction/UserActionLog";

const App = () => {
  const user = useSelector((state: any) => state.user);
  const carrier = getCarrierDetails(user);
  const dispatch = useDispatch();
  const towerList = useSelector((state: any) => state.towers);
  const simulate = useSelector((state: any) => state.device.simulated);
  const policy = useSelector((state: any) => state.policy.applied);
  const premium = useSelector((state: any) => state.premium.upgraded);

  const fetchApi = (carrier: string) => {
    dispatch(fetchDashboard(carrier));
  };

  useEffect(() => {
    if (carrier) fetchApi(carrier);
  }, [carrier, towerList, simulate, policy, premium]);

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
