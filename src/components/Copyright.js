import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography variant="body2" align="center" fontSize={10} {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        B-Energy S.p.A.
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
