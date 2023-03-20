import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/style.scss";
import awsconfig from "./aws-exports";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Invite from "./pages/sections/admin/Invite";
import Archiviosections from "./pages/sections/Archive";
import Richiestasections from "./pages/sections/Request";
Amplify.configure(awsconfig);

// ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "invite",
    element: <Invite />,
  },
  {
    path: "join/reg_id=:token&user=:user",
    element: <Join />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "omologazione/nuova",
    element: <Richiestasections />,
  },
  {
    path: "omologazione/archivio",
    element: <Archiviosections />,
  },
]);

// THEME
const theme = createTheme({
  palette: {
    primary: {
      main: "#014998",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ee7325",
      contrastText: "#000",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}
