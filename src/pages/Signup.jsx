import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {signup} from '../api/request';
import { useCloudinary } from "../hooks/useCloudinary";
import {AuthContext} from '../context/AuthContext'
import jwtDecode from "jwt-decode";
import {Spinner} from '../components/Spinner';
import {Link} from 'react-router-dom';

function Signup() {
  const {setCurrentUser}=useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const {url}=useCloudinary(file);
  const[loading,setLoading]=useState(false)

  const handleSignup = async () => {
    setLoading(true)
    try {
      if(url){
        const {data:token}=await signup(name,email,password,url);
        setLoading(false)
        localStorage.setItem('token',token)
        const decoded=jwtDecode(token);
        setCurrentUser(decoded)
        window.location='/dashboard'
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "grid", placeContent: "center", height: "100vh" }}
    >
      <Card sx={{ width: "25rem", border: "1px solid #dddddd" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} fontSize={22}>
            Signup
          </Typography>

          <FormControl  sx={{ marginTop: 3 }}>
            <TextField type={"text"} label="Name" fullWidth value={name} onChange={e=>setName(e.target.value)}/>
            <TextField
              type={"email"}
              label="Email"
              fullWidth
              sx={{ marginTop: 2 }}
              value={email} onChange={e=>setEmail(e.target.value)}
            />

            <TextField
              sx={{ marginY: 2 }}
              label="Password"
              type={"password"}
              fullWidth
              value={password} onChange={e=>setPassword(e.target.value)}
            />

            <TextField
              variant="outlined"
              type={"file"}
              fullWidth
              helperText="upload profile picture"
             onChange={e=>setFile(e.target.files[0])}
            />

            <Button disabled={!url} onClick={handleSignup} sx={{ marginTop: 2 }} fullWidth variant="outlined">
              {loading?<Spinner color={"primary"} size={22}/>:"Signup"}
            </Button>
          </FormControl>
          <Typography
            sx={{ cursor: "pointer" }}
            marginTop={2}
            variant="subtitle2"
          >
            Have an account? <Link to='/'>Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Signup;
