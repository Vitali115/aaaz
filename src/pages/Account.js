import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Account() {
  const navTo = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  const [passwordErr, setPasswordErr] = useState(false);
  const [password1Err, setPassword1Err] = useState(false);
  const [password2Err, setPassword2Err] = useState(false);

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [icon, setIcon] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleClickShowPassword1 = () => setShowPassword1(show => !show);
  const handleClickShowPassword2 = () => setShowPassword2(show => !show);
  const handleClickShowPassword3 = () => setShowPassword3(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(() => {
    async function getUser() {
      try {
        const result = await Auth.currentAuthenticatedUser();
        if (result) {
          setEmail(result.attributes.email);
        }
      } catch (err) {}
    }
    getUser();
  }, []);

  async function handleSubmit() {
    setPasswordErr(false);
    setPassword1Err(false);
    setPassword2Err(false);

    if (password !== "") {
      const checkPassed = await checkPassword(password1, password2);
      if (checkPassed) {
        Auth.currentAuthenticatedUser()
          .then(user => {
            return Auth.changePassword(user, password1, password2);
          })
          .then(data => console.log(data))
          .catch(err => {
            alert(err);
            if (err.code === "InvalidPasswordException") {
              setPasswordErr(true);
            }
            if (err.code === "NotAuthorizedException") {
              setPassword1Err(true);
            }
            if (err.code === "LimitExceededException") {
              setPasswordErr(true);
              setPassword2Err(true);
            }
          });
      } else if (!checkPassed) {
        setPassword2Err(true);
      }
    } else {
      setPassword1Err(true);
    }
  }

  async function checkPassword(newPassword, confirmPassword) {
    if (newPassword === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  async function signOut() {
    try {
      const result = await Auth.currentAuthenticatedUser();
      if (result) {
        await Auth.signOut();
        navTo("/");
      }
    } catch (err) {
      alert(err);
      navTo("/");
    }
  }

  return (
    <>
      <Navbar />
      <Container component="main" sx={{ mt: 10, mx: 5, mb: 10 }} maxWidth={"xl"}>
        <Typography variant="h4" marginTop={2}>
          Impostazioni Profilo
        </Typography>
        <Typography variant="subtitle2" marginTop={2}>
          In questa sezione puoi effettuare il <b>logout</b> e puoi modificare la tua password inserendone una nuova, che deve essere diversa dalla precedente e soddisfare i seguenti requisiti:
          lunghezza minima di <b>8 caratteri</b>, almeno <b>una maiuscola</b>, almeno <b>un numero</b> e almeno <b>un carattere speciale</b> (ad es. <b>!@#$%&*+-/=?._</b>).
        </Typography>

        <Divider sx={{ mt: 4 }} />

        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextField fullWidth disabled id="email" label={email} className="form-input" />
          </Grid>
          <Grid item md={4} lg={4} xl={4} sx={{ display: ["none", "none", "flex", "flex", "flex"], alignItems: "center" }}></Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <OutlinedInput
              fullWidth
              id="previousPassword"
              placeholder="Password Attuale"
              type={showPassword1 ? "text" : "password"}
              error={password1Err}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => {
                setTitle("Password Attuale");
                setText("La password attuale è necessaria per poter procedere con il cambio password, per motivi di sicurezza.");
                setIcon(true);
              }}
              onBlur={() => {
                setTitle();
                setText();
                setIcon(false);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword1} onMouseDown={handleMouseDownPassword}>
                    {showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item md={4} lg={4} xl={4} sx={{ display: ["none", "none", "flex", "flex", "flex"], alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontSize: 11 }}>
              Inserisci la tua password attuale per poter proseguire.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <OutlinedInput
              fullWidth
              id="newPassword"
              placeholder="Nuova Password"
              type={showPassword2 ? "text" : "password"}
              error={passwordErr}
              onChange={e => setPassword1(e.target.value)}
              onFocus={() => {
                setTitle("Nuova Password");
                setText("La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, un numero e un carattere speciale tra i seguenti: !@#$%&*+-/=?._");
                setIcon(true);
              }}
              onBlur={() => {
                setTitle();
                setText();
                setIcon(false);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword2} onMouseDown={handleMouseDownPassword}>
                    {showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item md={4} lg={4} xl={4} sx={{ display: ["none", "none", "flex", "flex", "flex"], alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontSize: 11 }}>
              La nuova password deve soddisfare i requisiti di sicurezza.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <OutlinedInput
              fullWidth
              id="confirmPassword"
              placeholder="Conferma Nuova Password"
              type={showPassword3 ? "text" : "password"}
              error={password2Err}
              onChange={e => setPassword2(e.target.value)}
              onFocus={() => {
                setTitle("Conferma Password");
                setText("Inserire nuovamente la nuova password per confermare la correttezza ed evitare errori.");
                setIcon(true);
              }}
              onBlur={() => {
                setTitle();
                setText();
                setIcon(false);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword3} onMouseDown={handleMouseDownPassword}>
                    {showPassword3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item md={4} lg={4} xl={4} sx={{ display: ["none", "none", "flex", "flex", "flex"], alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontSize: 11 }}>
              Ripeti la nuova password per verificarne la validità.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Button fullWidth type="submit" variant="contained" onClick={handleSubmit}>
              Conferma
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Divider sx={{ mb: 2 }} />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="error"
              onClick={() => {
                signOut();
              }}>
              Disconnettiti da questo account
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Sidebar title={title} text={text} icon={icon} />
      <Footer />
    </>
  );
}
