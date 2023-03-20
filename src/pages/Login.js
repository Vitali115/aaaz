import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideOne from "../assets/img/login/slide-1.jpg";
import SlideTwo from "../assets/img/login/slide-2.jpg";
import SlideThree from "../assets/img/login/slide-3.jpg";
import LogoSmall from "../assets/img/Logo.png";
import Copyright from "../components/Copyright";

const images = [SlideOne, SlideTwo, SlideThree];
const number = Math.floor(Math.random() * images.length);

export default function Login() {
  const navTo = useNavigate();

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrText, setEmailErrText] = useState("");
  const [password, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [passErrText, setPassErrText] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const result = await Auth.currentAuthenticatedUser();
        if (result) {
          localStorage.setItem("user", email);
          navTo("/home");
        }
      } catch (err) {
        setImage(images[number]);
      }
    }
    checkLoggedIn();
  }, []);

  async function signIn() {
    if (email === "") {
      setEmailErr(true);
    } else {
      setEmailErr(false);
      setEmailErrText();
    }
    if (password === "") {
      setPassErr(true);
    } else {
      setPassErr(false);
      setPassErrText();
    }

    try {
      const result = await Auth.signIn(email, password);
      if (result) {
        setPassErr(false);
        setEmailErr(false);
        localStorage.setItem("user", email);
        navTo("/home");
      }
    } catch (error) {
      alert(error);
      setPassErr(true);
      setEmailErr(true);
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      signIn();
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mt: "20%",
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <img src={LogoSmall} alt="B-Energy S.p.A." />
          <Box width={"90%"} sx={{ mt: 5 }}>
            
            <TextField
              autoFocus
              required
              fullWidth
              error={emailErr}
              helperText={emailErrText}
              margin="normal"
              label="Email"
              type="email"
              id="email"
              onKeyDown={handleKeyDown}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              required
              fullWidth
              error={passErr}
              helperText={passErrText}
              margin="normal"
              label="Password"
              type="password"
              id="password"
              onKeyDown={handleKeyDown}
              onChange={e => setPass(e.target.value)}
              sx={{ mt: 0 }}
            />

            <Button onClick={signIn} fullWidth type="submit" variant="contained" sx={{ my: 2 }}>
              <Typography>Accedi</Typography>
            </Button>

            <Copyright sx={{ mt: 2 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
