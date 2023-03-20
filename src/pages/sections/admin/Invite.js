import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { useState } from "react";
import awsconfig from "../../../aws-exports";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});

export default function Invite() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [icon, setIcon] = useState(false);

  function generateRandomToken() {
    let token = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@$^*+-_";
    const characters = uppercase + lowercase + numbers + special;
    for (let i = 0; i < 8; i++) {
      let randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      if (i === 0) {
        while (!uppercase.includes(randomChar)) {
          randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        }
      } else if (i === 1) {
        while (!lowercase.includes(randomChar)) {
          randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        }
      } else if (i === 2) {
        while (!numbers.includes(randomChar)) {
          randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        }
      } else if (i === 3) {
        while (!special.includes(randomChar)) {
          randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        }
      }
      token += randomChar;
    }
    return token;
  }

  function isEmail(email) {
    // eslint-disable-next-line
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  async function sendEmail() {
    setError(false);
    const check = await isEmail(email);
    if (check) {
      const token = generateRandomToken();
      const clientId = awsconfig.aws_user_pools_id;
      const region = awsconfig.aws_project_region;

      const params = {
        UserPoolId: clientId,
        Username: email,
        TemporaryPassword: token,
      };

      await new CognitoIdentityServiceProvider({ region: region }).adminCreateUser(params, function (err, data) {
        if (err) {
          setError(true);
          console.log(err);
        } else {
          setEmail("");
          console.log(data);
        }
      });
    } else {
      setError(true);
      return;
    }
  }

  return (
    <>
      <Navbar />
      <Container component="main" sx={{ mt: 10, mx: 5, mb: 10 }} maxWidth={"xl"}>
        <Typography variant="h4" marginTop={2}>
          Gestione inviti
        </Typography>
        <Typography variant="subtitle2" marginTop={2}>
          Questa pagina ti permette di invitare gli utenti tramite email. Gli indirizzi che ricevono l'invito riceveranno un link e le istruzioni per completare il processo di registrazione sul
          portale.
        </Typography>

        <Divider sx={{ mt: 4 }} />

        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextField
              autoFocus
              required
              fullWidth
              id="email"
              label="Indirizzo email da invitare"
              error={error}
              value={email}
              onFocus={() => {
                setTitle("Invita alla registrazione");
                setText(
                  "Inserisci un indirizzo email valido (ad esempio, nome@dominio.it) per invitare. Una volta confermato, l'indirizzo stesso riceverà un'email contenente la password automaticamente generata e un URL per completare la registrazione. Non è possibile invitare più volte lo stesso indirizzo."
                );
                setIcon(true);
              }}
              onBlur={() => {
                setTitle();
                setText();
                setIcon(false);
              }}
              onChange={event => {
                setEmail(event.target.value);
              }}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  sendEmail();
                }
              }}
              type="email"
            />
          </Grid>
          <Grid item md={4} lg={4} xl={4} sx={{ display: ["none", "none", "flex", "flex", "flex"], alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontSize: 11 }}>
              Inserisci un indirizzo email valido.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Button type="submit" size="large" fullWidth variant="contained" onClick={() => sendEmail()}>
              Invita
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Sidebar title={title} text={text} icon={icon} />
      <Footer />
    </>
  );
}
