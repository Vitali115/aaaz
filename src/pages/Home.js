import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container component="main" sx={{ mt: 10, mx: 5, mb: 10 }} maxWidth={"xl"}>
        <Typography variant="h4" marginTop={2}>
          Dashboard
        </Typography>
        <Typography variant="subtitle2" marginTop={2}>
          Puoi accedere ai vari servizi del portale B-Energy S.p.A. Clicca su uno dei pulsanti qui sotto o utilizza la barra di navigazione sulla sinistra per accedere ai servizi.
        </Typography>

        <Divider sx={{ mt: 4 }} />

        <Grid container spacing={2} marginTop={3} marginBottom={3}>
          <Grid item xs={12} sm={6}>
            <Box component="a" href="/omologazione/nuova">
              <Paper elevation={2} className="card">
                <Typography variant="h5">Richiesta di Omologa Rifiuto</Typography>
                <KeyboardArrowRightIcon />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="a" href="/omologazione/rinnovo">
              <Paper elevation={2} className="card">
                <Typography variant="h5">Richiesta di Rinnovo Omologa</Typography>
                <KeyboardArrowRightIcon />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="a" href="/omologazione/prenota">
              <Paper elevation={2} className="card">
                <Typography variant="h5">Richiesta di Prenotazione Conferimento</Typography>
                <KeyboardArrowRightIcon />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="a" href="/omologazione/archivio">
              <Paper elevation={2} className="card">
                <Typography variant="h5">Elenco delle Omologhe</Typography>
                <KeyboardArrowRightIcon />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
