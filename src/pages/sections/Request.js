import { FormLabel, Radio, RadioGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { createRequests } from "../../graphql/mutations";
import PhoneInput from "react-phone-input-2";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Popover from "@mui/material/Popover";

export default function HomologationForm(props) {
  // const navTo = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [ragioneSociale, setRagioneSociale] = useState("");
  const [sedeLegale, setSedeLegale] = useState("");
  const [cf, setCF] = useState("");
  const [pIva, setPIVA] = useState("");
  const [referente, setReferente] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [isProduttore, setIsProduttore] = useState(false);
  const [isTrasportatore, setIsTrasportatore] = useState(false);
  const [isIntermediario, setIsIntermediario] = useState(false);
  const [isDatiIntermediario, setIsDatiIntermediario] = useState(false);
  const [anga1, setAnga1] = useState(["4", "", dayjs()]);
  const [anga2, setAnga2] = useState(["4", "", dayjs()]);
  const [angaTrasportatore, setAngaTrasportatore] = useState([
    "4",
    "",
    dayjs(),
  ]);
  const [angaSecondoTrasportatore, setAngaSecondoTrasportatore] = useState([
    "4",
    "",
    dayjs(),
  ]);
  const [angaIntermediario, setAngaIntermediario] = useState([
    "4",
    "",
    dayjs(),
  ]);

  const [luogoProduzione, setLuogoProduzione] = useState("");
  const [referenteProduzione, setReferenteProduzione] = useState("");
  const [telProduzione, setTelProduzione] = useState("");
  const [emailProduzione, setEmailProduzione] = useState("");
  const [isSecondoTrasportatore, setIsSecondoTrasportatore] = useState(false);
  const [ragioneSocialeTrasportatore, setRagioneSocialeTrasportatore] =
    useState("");

  const [referenteTrasportatore, setReferenteTrasportatore] = useState("");
  const [telTrasportatore, setTelTrasportatore] = useState("");
  const [emailTrasportatore, setEmailTrasportatore] = useState("");
  const [ragioneSocialeIntermediario, setRagioneSocialeIntermediario] =
    useState("");

  const [referenteIntermediario, setReferenteIntermediario] = useState("");
  const [telIntermediario, setTelIntermediario] = useState("");
  const [emailIntermediario, setEmailIntermediario] = useState("");
  const [codiceEER, setCodiceEER] = useState("");
  const [catastalDescription, setCatastalDescription] = useState("");
  const [producerDescription, setProducerDescription] = useState("");

  const [dittaProduttore, setDittaProduttore] = useState("");
  const [sedeLegaleProduttore, setSedeLegaleProduttore] = useState("");
  const [cfProduttore, setCfProduttore] = useState("");
  const [pIvaProduttore, setPIvaProduttore] = useState("");
  const [ruoloProduttore, setRuoloProduttore] = useState("");
  const [allegatoTrasportatore, setAllegatoTrasportatore] = useState("");
  const [ragioneSocialeTrasp2, setRagioneSocialeTrasp2] = useState("");
  const [referenteTrasp2, setReferenteTrasp2] = useState("");
  const [telefonoTrasp2, setTelefonoTrasp2] = useState("");
  const [emailTrasp2, setEmailTrasp2] = useState("");
  const [allegatoTrasp2, setAllegatoTrasp2] = useState("");
  const [allegatoIntermediario, setAllegatoIntermediario] = useState("");
  const [syntheticDescription, setSyntheticDescription] = useState("");
  const [confezionamento, setConfezionamento] = useState("");
  const [quantita, setQuantita] = useState(0.0);
  const [frequenzaConferimento, setFrequenzaConferimento] = useState("");
  const [trasportoAdr, setTrasportoAdr] = useState("");

  // const [selectedHp, setSelectedHp] = useState("");

  // const handleHpSelection = (value) => {
  //   setSelectedHp(value);
  // };

  const [selectedHp, setSelectedHp] = useState([]);

  const handleHpSelection = (value) => {
    if (selectedHp.includes(value)) {
      setSelectedHp(selectedHp.filter((item) => item !== value));
    } else {
      setSelectedHp([...selectedHp, value]);
    }
  };

  const hp = [
    { value: "HP2", label: "HP2 (Comburente)" },
    { value: "HP3", label: "HP3 (Infiammabile)" },
    { value: "HP4", label: "HP4 (Irritante)" },
    { value: "HP5", label: "HP5 (Tossicità spec.)" },
    { value: "HP6", label: "HP6 (Tossicità acuta)" },
    { value: "HP7", label: "HP7 (Cancerogeno)" },
    { value: "HP8", label: "HP8 (Corrosivo)" },
    { value: "HP10", label: "HP10 (Tossico per la ripr.)" },
    { value: "HP11", label: "HP11 (Mutageno)" },
    { value: "HP12", label: "HP12 (Libera gas tossici)" },
    { value: "HP13", label: "HP13 (Sensibilizzante)" },
    { value: "HP14", label: "HP14 (Ecotossico) " },
  ];

  // PopUp Chiusura

  const [isFinalizzare, setIsFinalizzare] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsFinalizzare(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Upload

  const [isRdp, setIsRdp] = useState(false);
  const [isMSDS, setIsMSDS] = useState(false);
  const [isAltro, setIsAltro] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    props.onFileSelect(file);
  };

  async function handleCreate() {
    const ragioneSociale = document.getElementById("ragioneSociale").value;
    const sedeLegale = document.getElementById("sedeLegale").value;
    const codiceFiscale = document.getElementById("codiceFiscale").value;
    const sitoProduttivo = document.getElementById("sitoProduttivo").value;
    const referente = document.getElementById("referente").value;
    const email = document.getElementById("email").value;

    const item = {
      ragione_sociale: ragioneSociale,
      sede_legale: sedeLegale,
      codice_fiscale: codiceFiscale,
      sito_produttivo: sitoProduttivo,
      referente: referente,
      email: email,
    };
    setLoading(true);

    // Form

    // !Form

    try {
      const create = await API.graphql(
        graphqlOperation(createRequests, { input: item })
      );
      if (create) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openStep2Dialog, setOpenStep2Dialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenStep2Dialog(false);
  };

  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
    // const data =
    //   {
    //     ragione_sociale: ragioneSociale,
    //     partita_iva: [partitaIva, ],

    //  };
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    // Qui puoi aggiungere la logica per inviare la richiesta
  };

  const handleClickOpenStep2Dialog = () => {
    setOpenStep2Dialog(true);
  };

  const handleCloseStep2 = () => {
    setOpenStep2Dialog(false);
  };

  const [statoFisico, setStatoFisico] = useState("");

  const [selectedSF, setSelectedSF] = useState([]);

  const handleSFSelection = (value) => {
    if (selectedSF.includes(value)) {
      setSelectedSF(selectedSF.filter((item) => item !== value));
    } else {
      setSelectedSF([...selectedSF, value]);
    }
  };

  const sF = [
    { value: "Solido polv.", label: "Solido polv." },
    { value: "Solido non polv.", label: "Solido non polv." },
    { value: "Fangoso palabile", label: "Fangoso palabile" },
    { value: "Liquido", label: "Liquido" },
    { value: "Liq. fangoso pompabile", label: "Liq. fangoso pompabile" },
  ];

  //

  const [componente, setComponente] = useState("A");

  function mostraComponente(nome) {
    setComponente(nome);
  }

  return (
    <>
      <Navbar />
      <Container
        component="main"
        sx={{ mt: 10, mx: 5, mb: 10 }}
        maxWidth={"xl"}
      >
        <Typography variant="h4" marginTop={2}>
          Scheda Descrittiva Rifiuto
        </Typography>

        {componente === "A" && (
          <>
            <Typography variant="subtitle2" marginTop={2}>
              Placeholder
            </Typography>
          </>
        )}
        {componente === "B" && (
          <>
            <Typography variant="subtitle2" marginTop={2}>
              Scheda Riassuntiva
            </Typography>
          </>
        )}

        <button onClick={() => mostraComponente("A")}>A</button>
        <button onClick={() => mostraComponente("B")}>B</button>

        <Divider sx={{ mt: 4, mb: 4 }} />

        {componente === "A" && (
          <>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>DATI CLIENTE</StepLabel>
                <StepContent error={true}>
                  {/*     DATI CLIENTE */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="ragioneSociale"
                        label="Ragione Sociale"
                        value={ragioneSociale}
                        onChange={(e) => setRagioneSociale(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="sedeLegale"
                        label="Sede Legale"
                        value={sedeLegale}
                        onChange={(e) => setSedeLegale(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="codiceFiscale"
                        label="Codice Fiscale"
                        value={cf}
                        onChange={(e) => setCF(e.target.value)}
                        // error={ragioneSocialeErr}
                      />{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="PartitaIva"
                        label="P.IVA"
                        value={pIva}
                        onChange={(e) => setPIVA(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="referente"
                        label="Referente"
                        value={referente}
                        onChange={(e) => setReferente(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="ruolo"
                        label="Ruolo"
                        value={ruolo}
                        onChange={(e) => setRuolo(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="telefono"
                        label="Telefono"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        // error={ragioneSocialeErr}
                      />{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                  </Grid>
                  {/* !    DATI CLIENTE */}

                  {/*  SCELTA MULTIPLA  PROD / TRAS / INTERM    */}
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item sx={{ mt: 1, mb: 1 }} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() => setIsProduttore(!isProduttore)}
                          />
                        }
                        label="PRODUTTORE/DETENTORE DEL RIFIUTO"
                      />
                    </Grid>
                    {isProduttore && (
                      <Grid container sx={{ mt: 1, mb: 1 }} spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="luogoProduzione"
                            label="Luogo di produzione del rifiuto"
                            value={luogoProduzione}
                            onChange={(e) => setLuogoProduzione(e.target.value)}
                            // error={ragioneSocialeErr}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="referenteProduzione"
                            label="Referente di produzione"
                            value={referenteProduzione}
                            onChange={(e) =>
                              setReferenteProduzione(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="referenteProduzioneTel"
                            label="Email"
                            value={telProduzione}
                            onChange={(e) => setTelProduzione(e.target.value)}
                            // error={ragioneSocialeErr}
                          />{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="referenteProduzioneMail"
                            label="Phone"
                            value={emailProduzione}
                            onChange={(e) => setEmailProduzione(e.target.value)}
                            // error={ragioneSocialeErr}
                          />{" "}
                        </Grid>
                      </Grid>
                    )}
                    <Grid item sx={{ mt: 1, mb: 1 }} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="trasportatore"
                            color="primary"
                            onChange={() =>
                              setIsTrasportatore(!isTrasportatore)
                            }
                          />
                        }
                        label="TRASPORTATORE RIFIUTO"
                      />
                    </Grid>

                    {isTrasportatore && (
                      <Grid container sx={{ mt: 1, mb: 1 }} spacing={2}>
                        <Grid item xs={12}>
                          <Accordion
                          // disabled={!conferitore}
                          >
                            <AccordionSummary>
                              <Typography>Iscrizione A.N.G.A.</Typography>
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                                    handleFileSelect(e);
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
                          <Accordion
                          // disabled={!conferitore}
                          >
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                                  id="att1"
                                  type={"file"}
                                  value={anga2[3]}
                                  onChange={(e) => {
                                    setAnga2((prevArray) => {
                                      const newArray = [...prevArray];
                                      newArray[3] = e.target.files[0].name;
                                      return newArray;
                                    });
                                    handleFileSelect(e);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          sx={{}}
                                          onClick={(e) => {
                                            setAnga2((prevArray) => {
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
                      </Grid>
                    )}
                    <Grid item sx={{ mt: 1, mb: 1 }} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() =>
                              setIsIntermediario(!isIntermediario)
                            }
                          />
                        }
                        label="INTERMEDIARIO"
                      />
                    </Grid>

                    {isIntermediario && (
                      <Grid container sx={{ mt: 1, mb: 1 }} spacing={2}>
                        <Grid item xs={12}>
                          <Accordion
                          // disabled={!conferitore}
                          >
                            <AccordionSummary>
                              <Typography>Iscrizione A.N.G.A.</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormControl sx={{ m: 1, maxWidth: 150 }}>
                                <InputLabel id="angaInt">Cat.</InputLabel>
                                <Select
                                  labelId="angaInt"
                                  label="Cat."
                                  value={angaIntermediario[0]}
                                  onChange={(e) => {
                                    setAngaIntermediario((prevArray) => {
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
                                    setAngaIntermediario((prevArray) => {
                                      const newArray = [...prevArray];
                                      newArray[1] = e.target.value;
                                      return newArray;
                                    });
                                  }}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, maxWidth: 300 }}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    label="Data"
                                    inputFormat="DD/MM/YYYY"
                                    value={angaIntermediario[2]}
                                    onChange={(e) => {
                                      setAngaIntermediario((prevArray) => {
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
                                  value={angaIntermediario[3]}
                                  onChange={(e) => {
                                    setAngaIntermediario((prevArray) => {
                                      const newArray = [...prevArray];
                                      newArray[3] = e.target.files[0].name;
                                      return newArray;
                                    });
                                    handleFileSelect(e);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          sx={{}}
                                          onClick={(e) => {
                                            setAngaIntermediario(
                                              (prevArray) => {
                                                const newArray = [...prevArray];
                                                newArray[3] = "";
                                                return newArray;
                                              }
                                            );
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
                      </Grid>
                    )}
                    {/*  !SCELTA MULTIPLA 1     */}
                  </Grid>
                  {/*  !SCELTA MULTIPLA   PROD / TRAS / INTERM      */}
                  <Divider sx={{ mt: 4, mb: 4 }} />

                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // setError(false);
                        setActiveStep(activeStep + 1);
                      }}
                      disabled={activeStep === 2}
                    >
                      AVANTI
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>DATI PRODUTTORE/DETENTORE DEL RIFIUTO</StepLabel>
                <StepContent>
                  {/*     DATI PRODUTTORE/DETENTORE DEL RIFIUTO */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="dittaProduttore"
                        label="Ditta/Ente/Amministrazione"
                        value={dittaProduttore}
                        onChange={(e) => setDittaProduttore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
                      <TextField
                        required
                        fullWidth
                        id="sedeLegaleProduttore"
                        label="Sede Legale"
                        value={sedeLegaleProduttore}
                        onChange={(e) =>
                          setSedeLegaleProduttore(e.target.value)
                        }
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="cfProduttore"
                        label="CF"
                        value={cfProduttore}
                        onChange={(e) => setCfProduttore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="pIvaProduttore"
                        label="P.IVA"
                        value={pIvaProduttore}
                        onChange={(e) => setPIvaProduttore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="luogoProduzione"
                        label="Luogo di produzione del rifiuto"
                        value={luogoProduzione}
                        onChange={(e) => setLuogoProduzione(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="referenteProduzione"
                        label="Referente"
                        value={referenteProduzione}
                        onChange={(e) => setReferenteProduzione(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="ruoloProduttore"
                        label="Ruolo"
                        value={ruoloProduttore}
                        onChange={(e) => setRuoloProduttore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="telProduzione"
                        label="Tel"
                        value={telProduzione}
                        onChange={(e) => setTelProduzione(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="luogoProduzione"
                        label="Email"
                        value={emailProduzione}
                        onChange={(e) => setEmailProduzione(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                  </Grid>
                  {/* !    DATI PRODUTTORE/DETENTORE DEL RIFIUTO */}
                  <Divider sx={{ mt: 4, mb: 4 }} />
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      disabled={activeStep === 0}
                      sx={{ mr: 1 }}
                    >
                      INDIETRO
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // setError(false);
                        setActiveStep(activeStep + 1);
                      }}
                      disabled={activeStep === 2}
                    >
                      AVANTI
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>DATI TRASPORTATORE DEL RIFIUTO</StepLabel>
                <StepContent>
                  {/*   DATI TRASPORTATORE DEL RIFIUTO */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="ragioneSocialeTrasportatore"
                        label="P.IVA"
                        value={ragioneSocialeTrasportatore}
                        onChange={(e) =>
                          setRagioneSocialeTrasportatore(e.target.value)
                        }
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Accordion
                      // disabled={!conferitore}
                      >
                        <AccordionSummary>
                          <Typography>Iscrizione A.N.G.A.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl sx={{ m: 1, maxWidth: 150 }}>
                            <InputLabel id="angaangaTrasportatore">
                              Cat.
                            </InputLabel>
                            <Select
                              labelId="angaangaTrasportatore"
                              label="Cat."
                              value={angaTrasportatore[0]}
                              onChange={(e) => {
                                setAngaTrasportatore((prevArray) => {
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
                                handleFileSelect(e);
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
                    {/* Iscrizione A.N.G.A. cat. [MENU A TENDINA: 4; 5; 4-5] n. _________del______ */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="referenteTrasportatore"
                        label="Referente"
                        value={referenteTrasportatore}
                        onChange={(e) =>
                          setReferenteTrasportatore(e.target.value)
                        }
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="telTrasportatore"
                        label="Tel"
                        value={telTrasportatore}
                        onChange={(e) => setTelTrasportatore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="emailTrasportatore"
                        label="Email"
                        value={emailTrasportatore}
                        onChange={(e) => setEmailTrasportatore(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl sx={{ m: 1, maxWidth: 300 }}>
                        <TextField
                          id="att1"
                          type={"file"}
                          value={allegatoTrasportatore[3]}
                          onChange={(e) => {
                            setAllegatoTrasportatore(e.target.files[0].name);
                            handleFileSelect(e);
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  sx={{}}
                                  onClick={() => {
                                    setAllegatoTrasportatore("");
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/* !   DATI TRASPORTATORE DEL RIFIUTO */}
                  <Divider sx={{ mt: 4, mb: 4 }} />
                  {/* DATI SECONDO TRASPORTATORE */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() =>
                              setIsSecondoTrasportatore(!isSecondoTrasportatore)
                            }
                          />
                        }
                        label="SECONDO TRASPORTATORE"
                      />
                    </Grid>
                    {isSecondoTrasportatore && (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" marginTop={1}>
                            DATI SECONDO TRASPORTATORE
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="ragioneSocialeTrasp2"
                            label="P.IVA"
                            value={ragioneSocialeTrasp2}
                            onChange={(e) =>
                              setRagioneSocialeTrasp2(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Accordion
                          // disabled={!conferitore}
                          >
                            <AccordionSummary>
                              <Typography>Iscrizione A.N.G.A.</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormControl sx={{ m: 1, maxWidth: 150 }}>
                                <InputLabel id="anga1cat">Cat.</InputLabel>
                                <Select
                                  labelId="anga1cat"
                                  label="Cat."
                                  value={angaSecondoTrasportatore[0]}
                                  onChange={(e) => {
                                    setAngaSecondoTrasportatore((prevArray) => {
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
                                    setAngaSecondoTrasportatore((prevArray) => {
                                      const newArray = [...prevArray];
                                      newArray[1] = e.target.value;
                                      return newArray;
                                    });
                                  }}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, maxWidth: 300 }}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    label="Data"
                                    inputFormat="DD/MM/YYYY"
                                    value={angaSecondoTrasportatore[2]}
                                    onChange={(e) => {
                                      setAngaSecondoTrasportatore(
                                        (prevArray) => {
                                          const newArray = [...prevArray];
                                          newArray[2] = e;
                                          return newArray;
                                        }
                                      );
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
                                  value={angaSecondoTrasportatore[3]}
                                  onChange={(e) => {
                                    setAngaSecondoTrasportatore((prevArray) => {
                                      const newArray = [...prevArray];
                                      newArray[3] = e.target.files[0].name;
                                      return newArray;
                                    });
                                    handleFileSelect(e);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          sx={{}}
                                          onClick={(e) => {
                                            setAngaSecondoTrasportatore(
                                              (prevArray) => {
                                                const newArray = [...prevArray];
                                                newArray[3] = "";
                                                return newArray;
                                              }
                                            );
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
                          <TextField
                            required
                            fullWidth
                            id="referenteTrasp2"
                            label="Referente"
                            value={referenteTrasp2}
                            onChange={(e) => setReferenteTrasp2(e.target.value)}
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="telefonoTrasp2"
                            label="Tel"
                            value={telefonoTrasp2}
                            onChange={(e) => setTelefonoTrasp2(e.target.value)}
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="emailTrasp2"
                            label="Email"
                            value={emailTrasp2}
                            onChange={(e) => setEmailTrasp2(e.target.value)}
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 4 }}>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att1"
                              type={"file"}
                              value={allegatoTrasp2[3]}
                              onChange={(e) => {
                                setAllegatoTrasp2(e.target.files[0].name);
                                handleFileSelect(e);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      sx={{}}
                                      onClick={() => {
                                        setAllegatoTrasp2("");
                                      }}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  {/*!  DATI SECONDO TRASPORTATORE */}

                  {/*   DATI INTERMEDIARIO DEL RIFIUTO */}
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                      DATI INTERMEDIARIO DEL RIFIUTO
                    </Typography>
                  </Grid> */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() =>
                              setIsDatiIntermediario(!isDatiIntermediario)
                            }
                          />
                        }
                        label="INTERMEDIARIO"
                      />
                    </Grid>

                    {isDatiIntermediario && (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" marginTop={1}>
                            DATI INTERMEDIARIO
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="ragioneSocialeIntermediario"
                            label="P.IVA"
                            value={ragioneSocialeIntermediario}
                            onChange={(e) =>
                              setRagioneSocialeIntermediario(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="referenteIntermediario"
                            label="Referente"
                            value={referenteIntermediario}
                            onChange={(e) =>
                              setReferenteIntermediario(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="telIntermediario"
                            label="Tel"
                            value={telIntermediario}
                            onChange={(e) =>
                              setTelIntermediario(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="emailIntermediario"
                            label="Email"
                            value={emailIntermediario}
                            onChange={(e) =>
                              setEmailIntermediario(e.target.value)
                            }
                            // error={ragioneSocialeErr}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att1"
                              type={"file"}
                              value={setAllegatoIntermediario[3]}
                              onChange={(e) => {
                                setAllegatoIntermediario(
                                  e.target.files[0].name
                                );
                                handleFileSelect(e);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      sx={{}}
                                      onClick={() => {
                                        setAllegatoIntermediario("");
                                      }}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  {/*!  DATI INTERMEDIARIO DEL RIFIUTO */}
                  <Divider sx={{ mt: 4, mb: 4 }} />
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {" "}
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      disabled={activeStep === 0}
                      sx={{ mr: 1 }}
                    >
                      INDIETRO
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // setError(false);
                        setActiveStep(activeStep + 1);
                      }}
                      disabled={activeStep === 3}
                    >
                      AVANTI
                    </Button>{" "}
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>DATI RELATIVI AL RIFIUTO</StepLabel>
                <StepContent>
                  {/* DATI RELATIVI AL RIFIUTO */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="ErrCODE"
                        label="Codice EER"
                        value={codiceEER}
                        onChange={(e) => setCodiceEER(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="catastalDescription"
                        label="Descrizione catastale"
                        value={catastalDescription}
                        onChange={(e) => setCatastalDescription(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="producerDescription"
                        label="Descrizione del rifiuto data dal produttore"
                        value={producerDescription}
                        onChange={(e) => setProducerDescription(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="syntheticDescription"
                        label="Descrizione sintetica del ciclo produttivo del rifiuto"
                        value={syntheticDescription}
                        onChange={(e) =>
                          setSyntheticDescription(e.target.value)
                        }
                        // error={ragioneSocialeErr}
                      />
                    </Grid>

                    {/*   Stato fisico 4. LIQUIDO (menu a tendina come da mod. 10/03)    */}

                    <Grid item xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="Statofisico">Stato fisico</InputLabel>
                        <Select
                          labelId="Statofisico"
                          label="Stato fisico"
                          value={statoFisico}
                          onChange={(e) => {
                            setStatoFisico(e.target.value);
                          }}
                        >
                          <MenuItem value={"Solidopolv."}>
                            Solido polv.
                          </MenuItem>
                          <MenuItem value={"Solidononpolv."}>
                            Solido non polv.
                          </MenuItem>
                          <MenuItem value={"Fangosopalabile"}>
                            Fangoso palabile
                          </MenuItem>
                          <MenuItem value={"Liquido"}>Liquido</MenuItem>
                          <MenuItem value={"Liqfangosopompabile"}>
                            Liq. fangoso pompabile
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="confezionamento">
                          Confezionamento
                        </InputLabel>
                        <Select
                          labelId="confezionamento"
                          label="confezionamento"
                          value={confezionamento}
                          onChange={(e) => {
                            setConfezionamento(e.target.value);
                          }}
                        >
                          <MenuItem value={"SFUSO IN CISTERNA"}>
                            SFUSO IN CISTERNA
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="quantita"
                        label="Quantita"
                        value={quantita}
                        onChange={(e) => setQuantita(e.target.value)}
                        // error={ragioneSocialeErr}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="frequenza">
                          Frequenza conferimento
                        </InputLabel>
                        <Select
                          labelId="frequenza"
                          label="Frequenza conferimento"
                          value={statoFisico[3]}
                          onChange={(e) => {
                            setStatoFisico((prevArray) => {
                              const newArray = [...prevArray];
                              newArray[3] = e.target.value;
                              return newArray;
                            });
                          }}
                        >
                          {/* Aggiungi qui le opzioni per la frequenza di conferimento */}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="trasporto">Trasporto in ADR</InputLabel>
                        <Select
                          labelId="trasporto"
                          label="Trasporto in ADR"
                          value={statoFisico[4]}
                          onChange={(e) => {
                            setStatoFisico((prevArray) => {
                              const newArray = [...prevArray];
                              newArray[4] = e.target.value;
                              return newArray;
                            });
                          }}
                        >
                          <MenuItem value={"SI"}>SI</MenuItem>
                          <MenuItem value={"NO"}>NO</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/*! DATI RELATIVI AL RIFIUTO */}
                  <Divider sx={{ mt: 4, mb: 4 }} />
                  {/* pericolo (HP) */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" marginTop={1}>
                        <strong>Caratteristiche di pericolo (HP)</strong>{" "}
                        assegnate al rifiuto,
                        <br />
                        anche in ragione di ogni eventuale principio di
                        precauzione:
                      </Typography>
                    </Grid>

                    {hp.map((item) => (
                      <Grid item xs={6} key={item.value}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id={item.value}
                              checked={selectedHp.includes(item.value)}
                              onChange={() => handleHpSelection(item.value)}
                            />
                          }
                          label={item.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {/* !pericolo (HP) */}
                  <Divider sx={{ mt: 4, mb: 4 }} />

                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {" "}
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      disabled={activeStep === 0}
                      sx={{ mr: 1 }}
                    >
                      INDIETRO
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // setError(false);
                        setActiveStep(activeStep + 1);
                      }}
                      disabled={activeStep === 4}
                    >
                      AVANTI
                    </Button>{" "}
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>ALLEGATI TECNICI</StepLabel>
                <StepContent>
                  {/* ALLEGATI TECNICI */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() => setIsRdp(!isRdp)}
                          />
                        }
                        label="R.d.P."
                      />
                    </Grid>

                    {isRdp && (
                      <Grid container>
                        <Grid item xs={12}>
                          <FormControl sx={{ m: 1, maxWidth: 300 }}>
                            <TextField
                              id="att1"
                              type={"file"}
                              value={angaSecondoTrasportatore[3]}
                              onChange={(e) => {
                                setAngaSecondoTrasportatore((prevArray) => {
                                  const newArray = [...prevArray];
                                  newArray[3] = e.target.files[0].name;
                                  return newArray;
                                });
                                handleFileSelect(e);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      sx={{}}
                                      onClick={(e) => {
                                        setAngaSecondoTrasportatore(
                                          (prevArray) => {
                                            const newArray = [...prevArray];
                                            newArray[3] = "";
                                            return newArray;
                                          }
                                        );
                                      }}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() => setIsMSDS(!isMSDS)}
                          />
                        }
                        label="Scheda di sicurezza (MSDS) del prodotto da smaltire"
                      />
                    </Grid>

                    {isMSDS && (
                      <Grid item xs={12}>
                        <FormControl sx={{ m: 1, maxWidth: 300 }}>
                          <TextField
                            id="att1"
                            type={"file"}
                            value={angaSecondoTrasportatore[3]}
                            onChange={(e) => {
                              setAngaSecondoTrasportatore((prevArray) => {
                                const newArray = [...prevArray];
                                newArray[3] = e.target.files[0].name;
                                return newArray;
                              });
                              handleFileSelect(e);
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    sx={{}}
                                    onClick={(e) => {
                                      setAngaSecondoTrasportatore(
                                        (prevArray) => {
                                          const newArray = [...prevArray];
                                          newArray[3] = "";
                                          return newArray;
                                        }
                                      );
                                    }}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required
                            id="produttore"
                            color="primary"
                            onChange={() => setIsAltro(!isAltro)}
                          />
                        }
                        label="Altro"
                      />
                    </Grid>

                    {isAltro && (
                      <Grid item xs={12}>
                        <FormControl sx={{ m: 1, maxWidth: 300 }}>
                          <TextField
                            id="att1"
                            type={"file"}
                            value={angaSecondoTrasportatore[3]}
                            onChange={(e) => {
                              setAngaSecondoTrasportatore((prevArray) => {
                                const newArray = [...prevArray];
                                newArray[3] = e.target.files[0].name;
                                return newArray;
                              });
                              handleFileSelect(e);
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    sx={{}}
                                    onClick={(e) => {
                                      setAngaSecondoTrasportatore(
                                        (prevArray) => {
                                          const newArray = [...prevArray];
                                          newArray[3] = "";
                                          return newArray;
                                        }
                                      );
                                    }}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                  {/*! ALLEGATI TECNICI */}
                  <Divider sx={{ mt: 4, mb: 4 }} />

                  {/* POP UP DI RICHIESTA / STEP 2 */}

                  {/* ! POP UP DI RICHIESTA / STEP 2 */}

                  <Grid container>
                    <div>
                      <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>
                          Vuoi finalizzare la tua richiesta adesso?
                        </DialogTitle>
                        <DialogContent>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpenStep2Dialog}
                            style={{ marginBottom: "5px", width: "100%" }}
                          >
                            Si, voglio una valutazione preliminare
                          </Button>
                          <Button
                            // variant="contained"
                            // // // // color="secondary"
                            onClick={handleCloseDialog}
                          >
                            No, voglio completare la richiesta di omologa adesso
                            e farla sottoscrivere dal produttore del rifiuto
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={openStep2Dialog} onClose={handleCloseStep2}>
                        <DialogTitle>
                          <strong> ATTENZIONE </strong> : In questo modo potrai
                          richiedere una valutazione tecnica ed economica
                          preliminare, ma per l’attivazione dell’omologa e il
                          successivo conferimento sarà necessario completare la
                          seconda parte della modulistica in un secondo momento.
                        </DialogTitle>
                        <DialogContent>
                          <Button
                            style={{ width: "49%", marginRight: "5px" }}
                            variant="contained"
                            color="primary"
                            onClick={() => mostraComponente("B")}
                          >
                            SI
                          </Button>
                          <Button
                            style={{ width: "49%" }}
                            // variant="contained"
                            // color="secondary"
                            onClick={handleCloseStep2}
                          >
                            NO
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
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
                      INDIETRO
                    </Button>{" "}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpenDialog}
                    >
                      Finalizza richiesta
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </>
        )}

        {componente === "B" && (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">DATI CLIENTE</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="ragioneSociale"
                  label="Ragione Sociale"
                  value={ragioneSociale}
                  onChange={(e) => setRagioneSociale(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="sedeLegale"
                  label="Sede Legale"
                  value={sedeLegale}
                  onChange={(e) => setSedeLegale(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="codiceFiscale"
                  label="Codice Fiscale"
                  value={cf}
                  onChange={(e) => setCF(e.target.value)}
                  // error={ragioneSocialeErr}
                />{" "}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="PartitaIva"
                  label="P.IVA"
                  value={pIva}
                  onChange={(e) => setPIVA(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="referente"
                  label="Referente"
                  value={referente}
                  onChange={(e) => setReferente(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="ruolo"
                  label="Ruolo"
                  value={ruolo}
                  onChange={(e) => setRuolo(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="telefono"
                  label="Telefono"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  // error={ragioneSocialeErr}
                />{" "}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <Grid container marginTop={2} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  PRODUTTORE/DETENTORE DEL RIFIUTO
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="luogoProduzione"
                  label="Luogo di produzione del rifiuto"
                  value={luogoProduzione}
                  onChange={(e) => setLuogoProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="referenteProduzione"
                  label="Referente di produzione"
                  value={referenteProduzione}
                  onChange={(e) => setReferenteProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="referenteProduzioneTel"
                  label="Email"
                  value={telProduzione}
                  onChange={(e) => setTelProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />{" "}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="referenteProduzioneMail"
                  label="Phone"
                  value={emailProduzione}
                  onChange={(e) => setEmailProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />{" "}
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <Grid container marginTop={2} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  TRASPORTATORE RIFIUTO
                </Typography>
              </Grid>

              <Grid item xs={1.5}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={4.5}>
                <FormControl sx={{ width: "100%" }}>
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
                      handleFileSelect(e);
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
              </Grid>
            </Grid>

            <Grid container marginTop={2} spacing={1}>
              <Grid item xs={1.5}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>
              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={4.5}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    id="att1"
                    type={"file"}
                    value={anga2[3]}
                    onChange={(e) => {
                      setAnga2((prevArray) => {
                        const newArray = [...prevArray];
                        newArray[3] = e.target.files[0].name;
                        return newArray;
                      });
                      handleFileSelect(e);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{}}
                            onClick={(e) => {
                              setAnga2((prevArray) => {
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
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <Grid container marginTop={2} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">INTERMEDIARIO</Typography>
              </Grid>

              <Grid item xs={1.5}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="angaInt">Cat.</InputLabel>
                  <Select
                    labelId="angaInt"
                    label="Cat."
                    value={angaIntermediario[0]}
                    onChange={(e) => {
                      setAngaIntermediario((prevArray) => {
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
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Numero"
                    onChange={(e) => {
                      setAngaIntermediario((prevArray) => {
                        const newArray = [...prevArray];
                        newArray[1] = e.target.value;
                        return newArray;
                      });
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data"
                      inputFormat="DD/MM/YYYY"
                      value={angaIntermediario[2]}
                      onChange={(e) => {
                        setAngaIntermediario((prevArray) => {
                          const newArray = [...prevArray];
                          newArray[2] = e;
                          return newArray;
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={4.5}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    id="att1"
                    type={"file"}
                    value={angaIntermediario[3]}
                    onChange={(e) => {
                      setAngaIntermediario((prevArray) => {
                        const newArray = [...prevArray];
                        newArray[3] = e.target.files[0].name;
                        return newArray;
                      });
                      handleFileSelect(e);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{}}
                            onClick={(e) => {
                              setAngaIntermediario((prevArray) => {
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
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 3 }} />

            {/*     DATI PRODUTTORE/DETENTORE DEL RIFIUTO */}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  DATI PRODUTTORE/DETENTORE DEL RIFIUTO
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="dittaProduttore"
                  label="Ditta/Ente/Amministrazione"
                  value={dittaProduttore}
                  onChange={(e) => setDittaProduttore(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                {" "}
                <TextField
                  required
                  fullWidth
                  id="sedeLegaleProduttore"
                  label="Sede Legale"
                  value={sedeLegaleProduttore}
                  onChange={(e) => setSedeLegaleProduttore(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="cfProduttore"
                  label="CF"
                  value={cfProduttore}
                  onChange={(e) => setCfProduttore(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="pIvaProduttore"
                  label="P.IVA"
                  value={pIvaProduttore}
                  onChange={(e) => setPIvaProduttore(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="luogoProduzione"
                  label="Luogo di produzione del rifiuto"
                  value={luogoProduzione}
                  onChange={(e) => setLuogoProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="referenteProduzione"
                  label="Referente"
                  value={referenteProduzione}
                  onChange={(e) => setReferenteProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="ruoloProduttore"
                  label="Ruolo"
                  value={ruoloProduttore}
                  onChange={(e) => setRuoloProduttore(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="telProduzione"
                  label="Tel"
                  value={telProduzione}
                  onChange={(e) => setTelProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="luogoProduzione"
                  label="Email"
                  value={emailProduzione}
                  onChange={(e) => setEmailProduzione(e.target.value)}
                  // error={ragioneSocialeErr}
                />
              </Grid>
            </Grid>
            {/* !    DATI PRODUTTORE/DETENTORE DEL RIFIUTO */}
          </>
        )}
      </Container>

      <Sidebar />
      <Footer loading={loading} />
    </>
  );
}
