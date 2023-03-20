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

export default function HomologationForm() {
  // const navTo = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

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

    try {
      const create = await API.graphql(graphqlOperation(createRequests, { input: item }));
      if (create) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <Container component="main" sx={{ mt: 10, mx: 5, mb: 10 }} maxWidth={"xl"}>
        <Typography variant="h4" marginTop={2}>
          Scheda Descrittiva Rifiuto
        </Typography>
        <Typography variant="subtitle2" marginTop={2}>
          Placeholder
        </Typography>

        <Divider sx={{ mt: 4 }} />

        <Grid item xs={12} mt={2}>
          <Box marginBottom={3}>
            <Typography component="h1" variant="h6">
              Dati Personali
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField autoFocus required fullWidth id="ragioneSociale" label="Ragione Sociale" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="sedeLegale" label="Sede Legale" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="codiceFiscale" label="Codice Fiscale/P.IVA" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="sitoProduttivo" label="Sito Produttivo" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="referente" label="Referente" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="ruolo " label="Ruolo" className="form-input" size="small" />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box marginTop={3} marginBottom={3}>
            <Typography component="h1" variant="h6">
              Dati Rifiuto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <FormControlLabel control={<Checkbox required id="produttore" color="primary" />} label="Produttore" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="luogoProduzione" label="Luogo di produzione del rifiuto" className="form-input" size="small" />
              </Grid>
              <Grid item xs={10} sm={12} md={6} lg={6} xl={6}>
                <PhoneInput
                  countryCodeEditable={"false"}
                  country="it"
                  // onChange={phone => setTelefono(phone)}
                  specialLabel={"Telefono"}
                  inputStyle={{ width: "100%", height: "40px" }}
                  localization={"it"}
                  className="form-input"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField fullWidth id="email" label="Email Produttore" value={email} className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="codiceCer" label="Codice CER" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RadioGroup row>
                  <FormControlLabel value="specPer" control={<Radio />} label="Speciale Pericoloso" />
                  <FormControlLabel value="specNonPer" control={<Radio />} label="Speciale Non Pericoloso" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="descCatastale" label="Descrizione catastale del rifiuto" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="descProduttore" label="Descrizione data dal produttore" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Stato fisico</FormLabel>
                <RadioGroup req row>
                  <FormControlLabel value="solidoPolv" control={<Radio />} label="Solido polv." />
                  <FormControlLabel value="solidoNonPolv" control={<Radio />} label="Solido non polv." />
                  <FormControlLabel value="fangPal" control={<Radio />} label="Fangoso palabile" />
                  <FormControlLabel value="liq" control={<Radio />} label="Liquido palabile" />
                  <FormControlLabel value="liqFanPom" control={<Radio />} label="Liquido fangoso pompabile" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="carattPericolo" label="Caratteristiche di pericolo (HP)" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="processoProduttivo" label="Processo produttivo di origine" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="matPrime" label="Ev. materie prime pericolose impiegate nel processo" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="qta" label="Quantità" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="freqConferimento" label="Freq. conferimento" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="rdp" label="RdP/Certificato allegato n." className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="del" label="del" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="lab" label="Laboratorio" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="modConfezionamento" label="Modalità di confezionamento" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Rifiuto sottoposto ad ADR" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required fullWidth id="unNumber" label="UN n." className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required fullWidth id="classi" name="classi" label="Classi" autoComplete="classi" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required fullWidth id="gruppoImballaggio" name="gruppoImballaggio" label="Gruppo di imballaggio" autoComplete="gruppo-imballaggio" className="form-input" size="small" />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box marginTop={3} marginBottom={3}>
            <Typography component="h1" variant="h6">
              Dati Cliente/Conferitore
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="ragioneSociale" label="Ragione Sociale" name="ragioneSociale" autoComplete="ragione-sociale" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="sedeLegale" label="Sede Legale" name="sedeLegale" autoComplete="sede-legale" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth id="codiceFiscale" label="Codice Fiscale/P.IVA" name="codiceFiscale" autoComplete="codice-fiscale" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField required fullWidth name="referente" label="Referente" type="referente" id="referente" autoComplete="referente" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="email" label="Email" name="email" autoComplete="email" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="tel" label="Tel" name="tel" autoComplete="tel" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="fax" label="Fax" name="fax" autoComplete="fax" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormLabel>Intermediario</FormLabel>
                  </Grid>
                  <Grid item>
                    <RadioGroup defaultValue={"no"} row>
                      <FormControlLabel
                        value="si"
                        control={
                          <Radio
                            onChange={() => {
                              setDisabled(false);
                            }}
                          />
                        }
                        label="Sì"
                      />
                      <FormControlLabel
                        value="no"
                        control={
                          <Radio
                            onChange={() => {
                              setDisabled(true);
                            }}
                          />
                        }
                        label="No"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField disabled={disabled} required fullWidth id="autCat" label="Aut.Cat." name="autCat" autoComplete="autCat" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField disabled={disabled} required fullWidth id="num" label="n°" name="num" autoComplete="num" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField disabled={disabled} required fullWidth id="del" label="del" name="del" autoComplete="del" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="trasp" label="Trasportatore" name="trasp" autoComplete="trasp" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField required fullWidth id="autCat" label="Aut.Cat." name="autCat" autoComplete="autCat" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required fullWidth id="num" label="n°" name="num" autoComplete="num" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required fullWidth id="del" label="del" name="del" autoComplete="del" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField required fullWidth id="refTrasp" label="Referente Trasp." name="refTrasp" autoComplete="refTrasp" className="form-input" size="small" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required fullWidth id="email" label="E-mail" name="email" autoComplete="email" className="form-input" size="small" />
              </Grid>
            </Grid>
          </Box>
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, mb: 2 }} onClick={handleCreate}>
            Invia Richiesta
          </Button>
        </Grid>
      </Container>
      <Sidebar />
      <Footer loading={loading} />
    </>
  );
}
