import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";

const useStyles = makeStyles(theme => ({
  drawer: {
    zIndex: 0,
    width: "15%",
    flexShrink: 0,
    backgroundColor: "#fafafa !important",
    "@media (max-width: 900px)": { display: "none" },
    "@media (max-width: 1200px)": { width: "20% !important" },
  },
  drawerPaper: {
    width: "15%",
    backgroundColor: "#fafafa !important",
    "@media (max-width: 1200px)": { width: "20% !important" },
  },
}));

export default function PermanentRightSidebar(props) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={true}
      anchor="right">
      <Box sx={{ mt: 10, mx: 2, display: "flex" }}>
        <Grid container>
          <Grid item lg={12} xl={12} sx={{ display: props.icon ? "flex" : "none", alignItems: "center", justifyContent: "flex-end" }}>
            <HelpIcon opacity={0.9} />
          </Grid>
          <Grid item lg={12} xl={12} sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h5">{props.title}</Typography>
          </Grid>
          <Grid item lg={12} xl={12}>
            <Divider sx={{ display: props.icon ? "block" : "none" }} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              {props.text}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}
