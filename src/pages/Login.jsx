import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  filledInputClasses,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/request";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: token } = await login(email, password);
      const decoded = jwtDecode(token);
      setLoading(false);
      localStorage.setItem("token", token);
      setCurrentUser(decoded);
      window.location="/dashboard"
    } catch (error) {
      setLoading(false);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "grid", placeContent: "center", height: "100vh" }}
    >
      <Card sx={{ width: "25rem", border: "1px solid #dddddd" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} fontSize={22}>
            Login
          </Typography>
          <FormControl fullWidth>
            <Box marginTop={4}>
              <TextField
                type={"email"}
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box marginTop={2}>
              <TextField
                label="Password"
                type={"password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </FormControl>
          <Button
            onClick={handleLogin}
            sx={{ marginTop: 2 }}
            fullWidth
            variant="outlined"
          >
            {loading ? <Spinner color={"primary"} size={22} /> : "Login"}
          </Button>
          <Typography
            sx={{ cursor: "pointer" }}
            marginTop={2}
            variant="subtitle2"
          >
            Don't have an account? <Link to='/signup'>Signup</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
