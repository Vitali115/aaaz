import { Storage } from "@aws-amplify/storage";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { API, Auth, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate, useParams } from "react-router-dom";
import LogoSmall from "../assets/img/Logo.png";
import Footer from "../components/Footer";
import { createAttachments, createUsers } from "../graphql/mutations";
import ClearIcon from "@mui/icons-material/Clear";

export default function Join() {
  const navTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [ragioneSocialeErr, setRagioneSocialeErr] = useState(false);
  const [sedeLegale, setSedeLegale] = useState("");
  const [sedeLegaleErr, setSedeLegaleErr] = useState(false);
  const [codiceFiscale, setCodiceFiscale] = useState("");
  const [codiceFiscaleErr, setCodiceFiscaleErr] = useState(false);
  const [partitaIva, setPartitaIva] = useState("");
  const [partitaIvaErr, setPartitaIvaErr] = useState(false);
  const [referente, setReferente] = useState("");
  const [referenteErr, setReferenteErr] = useState(false);
  const [ruolo, setRuolo] = useState("");
  const [ruoloErr, setRuoloErr] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [produttore, setProduttore] = useState(false);
  const [conferitore, setConferitore] = useState(false);
  const [intermediario, setIntermediario] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password1Err, setPassword1Err] = useState(false);
  const [password2, setPassword2] = useState("");
  const [password2Err, setPassword2Err] = useState(false);
  const [anga1, setAnga1] = useState(["4", "", dayjs()]);
  const [anga2, setAnga2] = useState(["4", "", dayjs()]);
  const [anga3, setAnga3] = useState(["4", "", dayjs()]);
  const [att1, setAtt1] = useState(null);
  const [att2, setAtt2] = useState(null);
  const [att3, setAtt3] = useState(null);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { token } = useParams();
  const { user } = useParams();

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const fileName = email + "/" + file.name;

    try {
      const stored = await Storage.put(fileName, file, {
        contentType: file.type,
      });
      if (stored) {
        const userUpload = {
          email: email,
          filename: fileName,
        };
        const result = await API.graphql(
          graphqlOperation(createAttachments, { input: userUpload })
        );
        if (result) {
          console.log(stored);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setEmail(user);
  }, []);

  async function signUp() {
    setLoading(true);
    const check = await checkPassword();
    const tel = "+" + telefono;
    if (!check) {
      setError(true);
      return;
    } else if (check) {
      setError(false);
      const createUserInput = {
        email: email,
        ragione_sociale: ragioneSociale,
        sede_legale: sedeLegale,
        codice_fiscale: codiceFiscale,
        partita_iva: partitaIva,
        referente: referente,
        ruolo: ruolo,
        telefono: tel,
        produttore: produttore,
        conferitore: conferitore,
        intermediario_commerciale: intermediario,
        anga: ["1", "2", "B", "C"],
        anga2: ["2", "3", "D", "E"],
        anga3: ["4", "5", "F", "G"],
      };

      await Auth.signIn(user, token)
        .then((user) => {
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            Auth.completeNewPassword(user, password1)
              .then(async (user) => {
                const result = await API.graphql(
                  graphqlOperation(createUsers, { input: createUserInput })
                );
                if (result) {
                  setLoading(false);
                  localStorage.setItem("user", email);
                  navTo("/home");
                } else {
                  setLoading(false);
                  alert("Errore nella registrazione della nuova utenza.");
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function checkUserInput() {
    var result = true;
    if (ragioneSociale === "") {
      result = false;
      setRagioneSocialeErr(true);
    } else {
      setRagioneSocialeErr(false);
    }
    if (sedeLegale === "") {
      result = false;
      setSedeLegaleErr(true);
    } else {
      setSedeLegaleErr(false);
    }
    if (referente === "") {
      result = false;
      setReferenteErr(true);
    } else {
      setReferenteErr(false);
    }
    if (ruolo === "") {
      result = false;
      setRuoloErr(true);
    } else {
      setRuoloErr(false);
    }
    if (codiceFiscale === "" && partitaIva === "") {
      result = false;
      setCodiceFiscaleErr(true);
      setPartitaIvaErr(true);
    } else if (codiceFiscale !== "" && partitaIva !== "") {
      result = false;
      setCodiceFiscaleErr(true);
      setPartitaIvaErr(true);
    } else {
      setCodiceFiscaleErr(false);
      setPartitaIvaErr(false);
    }
    return result;
  }

  function checkPassword() {
    var result = true;
    if (password1 !== password2) {
      result = false;
      setPassword2Err(true);
    } else {
      setPassword2Err(false);
    }

    const lengthCheck = password1.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password1);
    const numberCheck = /\d/.test(password1);
    const specialCharCheck = /[!@#$%&*+-/=?._]/.test(password1);
    if (!lengthCheck || !upperCaseCheck || !numberCheck || !specialCharCheck) {
      result = false;
      setPassword1Err(true);
      setPassword2Err(true);
    } else {
      setPassword1Err(false);
      setPassword2Err(false);
    }
    return result;
  }

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box sx={{ p: 10, mt: 10, mb: 10 }}>
          <center>
            <img src={LogoSmall} alt="B-Energy S.p.A." />
          </center>

          <Typography variant="subtitle2" marginTop={2}>
            In questa pagina puoi registrare il tuo indirizzo email al portale
            B-Energy S.p.A. I campi contrassegnati con un asterisco sono
            obbligatori. La password deve soddisfare i seguenti requisiti:
            lunghezza minima di <b>8 caratteri</b>, almeno <b>una maiuscola</b>,
            almeno <b>un numero</b> e almeno <b>un carattere speciale</b> (ad
            es. <b>!@#$%&*+-/=?._</b>).
          </Typography>

          <Divider sx={{ mt: 4 }} />

          <Box sx={{ mt: 3 }}>
            <Alert
              severity="error"
              sx={{ width: "100%", mb: 2, ...(!error && { display: "none" }) }}
            >
              Verificare le informazioni inserite.
            </Alert>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Dati Personali</StepLabel>
                <StepContent>
                  <Grid container spacing={2} justifyContent={"center"}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="ragioneSociale"
                        label="Ragione Sociale"
                        value={ragioneSociale}
                        onChange={(e) => setRagioneSociale(e.target.value)}
                        error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="sedeLegale"
                        label="Sede Legale"
                        value={sedeLegale}
                        onChange={(e) => setSedeLegale(e.target.value)}
                        error={sedeLegaleErr}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="codiceFiscale"
                        value={codiceFiscale}
                        label="Codice Fiscale"
                        onChange={(e) => setCodiceFiscale(e.target.value)}
                        error={codiceFiscaleErr}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="partitaIva"
                        label="Partita IVA"
                        value={partitaIva}
                        onChange={(e) => setPartitaIva(e.target.value)}
                        error={partitaIvaErr}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="referente"
                        label="Referente"
                        value={referente}
                        onChange={(e) => setReferente(e.target.value)}
                        error={referenteErr}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        required
                        fullWidth
                        id="ruolo"
                        label="Ruolo"
                        value={ruolo}
                        onChange={(e) => setRuolo(e.target.value)}
                        error={ruoloErr}
                      />
                    </Grid>
                    <Grid item xs={10} sm={12} md={6} lg={6} xl={6}>
                      <PhoneInput
                        countryCodeEditable={"false"}
                        country="it"
                        value={telefono}
                        onChange={(phone) => setTelefono(phone)}
                        specialLabel={"Telefono"}
                        inputStyle={{ width: "100%", height: "56px" }}
                        localization={"it"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField disabled fullWidth id="email" value={email} />
                    </Grid>
                  </Grid>
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const result = checkUserInput();
                        if (result) {
                          setError(false);
                          setActiveStep(activeStep + 1);
                        } else {
                          setError(true);
                        }
                      }}
                      disabled={activeStep === 2}
                    >
                      Avanti
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Dati Specifici</StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() => setProduttore(!produttore)}
                          />
                        }
                        label="Produttore"
                      />
                    </Grid>
                    
                    
                    
                    
                    
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="conferitore"
                            color="primary"
                            onChange={() => setConferitore(!conferitore)}
                          />
                        }
                        label="Conferitore"
                      />
                    </Grid>
                    
                    
                    
                    
                    <Grid item xs={12}>
                    
                    
                      <Accordion disabled={!conferitore}>
                        <AccordionSummary>
                          <Typography>1. Iscrizione A.N.G.A.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <InputLabel id="anga1cat">Cat.</InputLabel>
                            <Select
                              labelId="anga1cat"
                              label="Cat."
                              value={anga1[0]}
                              onChange={(e) => {
                                setAnga1((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[0] = e.target.value;
                                  return newArray;
                                });
                              }}
                            >
                              <MenuItem value={"4"}>4</MenuItem>
                              <MenuItem value={"5"}>5</MenuItem>
                              <MenuItem value={"4-5"}>4-5</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <TextField
                              label="Numero"
                              onChange={(e) => {
                                setAnga1((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[1] = e.target.value;
                                  return newArray;
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Data"
                                inputFormat="DD/MM/YYYY"
                                value={anga1[2]}
                                onChange={(e) => {
                                  setAnga1((prevArray) => {
                                    const newArray = [...prevArray];
                                    newArray[2] = e;
                                    return newArray;
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att1"
                              type={"file"}
                              value={anga1[3]}
                              onChange={(e) => {
                                setAnga1((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[3] = e.target.files[0].name;
                                  return newArray;
                                });
                                handleUpload(e);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      sx={{}}
                                      onClick={(e) => {
                                        setAnga1((prevArray) => {
                                          const newArray = [...prevArray];
                                          newArray[3] = "";
                                          return newArray;
                                        });
                                      }}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                      <Accordion disabled={!conferitore}>
                        <AccordionSummary>
                          <Typography>2. Iscrizione A.N.G.A.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <InputLabel id="anga2cat">Cat.</InputLabel>
                            <Select
                              labelId="anga2cat"
                              label="Cat."
                              value={anga2[0]}
                              onChange={(e) => {
                                setAnga2((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[0] = e.target.value;
                                  return newArray;
                                });
                              }}
                            >
                              <MenuItem value={"4"}>4</MenuItem>
                              <MenuItem value={"5"}>5</MenuItem>
                              <MenuItem value={"4-5"}>4-5</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <TextField
                              label="Numero"
                              onChange={(e) => {
                                setAnga2((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[1] = e.target.value;
                                  return newArray;
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Data"
                                inputFormat="DD/MM/YYYY"
                                value={anga2[2]}
                                onChange={(e) => {
                                  setAnga2((prevArray) => {
                                    const newArray = [...prevArray];
                                    newArray[2] = e;
                                    return newArray;
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att2"
                              type={"file"}
                              value={anga2[3]}
                              onChange={(e) => {
                                setAnga2((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[3] = e.target.files[0].name;
                                  return newArray;
                                });
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <AttachFileIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="intermediarioCommerciale"
                            color="primary"
                            onChange={() => setIntermediario(!intermediario)}
                          />
                        }
                        label="Intermediario Commerciale"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Accordion disabled={!intermediario}>
                        <AccordionSummary>
                          <Typography>3. Iscrizione A.N.G.A.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <InputLabel id="anga3cat">Cat.</InputLabel>
                            <Select
                              labelId="anga3cat"
                              label="Cat."
                              value={anga3[0]}
                              onChange={(e) => {
                                setAnga3((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[0] = e.target.value;
                                  return newArray;
                                });
                              }}
                            >
                              <MenuItem value={"4"}>4</MenuItem>
                              <MenuItem value={"5"}>5</MenuItem>
                              <MenuItem value={"4-5"}>4-5</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <TextField
                              label="Numero"
                              onChange={(e) => {
                                setAnga3((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[1] = e.target.value;
                                  return newArray;
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Data"
                                inputFormat="DD/MM/YYYY"
                                value={anga3[2]}
                                onChange={(e) => {
                                  setAnga3((prevArray) => {
                                    const newArray = [...prevArray];
                                    newArray[2] = e;
                                    return newArray;
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att3"
                              type={"file"}
                              value={anga3[3]}
                              onChange={(e) => {
                                setAnga3((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[3] = e.target.files[0].name;
                                  return newArray;
                                });
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <AttachFileIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                  
                  
                  
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      disabled={activeStep === 0}
                      sx={{ mr: 1 }}
                    >
                      Indietro
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const result = checkUserInput();
                        if (result) {
                          setError(false);
                          setActiveStep(activeStep + 1);
                        } else {
                          setError(true);
                        }
                      }}
                      disabled={activeStep === 2}
                    >
                      Avanti
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Verifica Dati</StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <OutlinedInput
                        required
                        autoFocus
                        fullWidth
                        id="password"
                        placeholder="Password"
                        type={showPassword1 ? "text" : "password"}
                        onChange={(e) => setPassword1(e.target.value)}
                        error={password1Err}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword1 ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <OutlinedInput
                        required
                        fullWidth
                        id="confirmPassword"
                        placeholder="Conferma Password"
                        type={showPassword2 ? "text" : "password"}
                        onChange={(e) => setPassword2(e.target.value)}
                        error={password2Err}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword2 ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      sx={{ mr: 1 }}
                    >
                      Indietro
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => signUp()}
                    >
                      Registrati
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Box>
      </Container>
      <Footer loading={loading} />
    </>
  );
}
