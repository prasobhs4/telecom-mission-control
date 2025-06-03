import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import backgroundImage from "../../assets/login.jpg";
import { setUser } from "../../store/user/userActions";
import { useDispatch } from "react-redux";
import { getCarrierDetails } from "../utils/util";

const Login: React.FC<{ onLogin?: () => void }> = ({
  onLogin,
}: {
  onLogin?: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onLogin) onLogin();
    const user = {
      username,
      password,
      carrier: getCarrierDetails({ username, password }),
    };
    dispatch(setUser(user));
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <img src={backgroundImage} alt="background" className="background-img" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Carrier Access Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
