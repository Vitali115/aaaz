import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import RefreshIcon from "@mui/icons-material/Refresh";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSmall from "../assets/img/Logo.png";
import { listRequests } from "../graphql/queries";

const drawerWidth = 270;
const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 7px)`,
  // [theme.breakpoints.up("sm")]: {
  //   width: `calc(${theme.spacing(8)} + 7px)`,
  // },
});
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const navTo = useNavigate();

  const [email, setEmail] = useState();
  const [initials, setInitials] = useState();
  const [open, setOpen] = useState(false);
  const [anchorElNotification, setAnchorElNotification] = useState("");
  const [notificationRows, setNotificationRows] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const notification = Boolean(anchorElNotification);
  const { pathname } = useLocation();

  useEffect(() => {
    async function getUser() {
      try {
        const result = await Auth.currentAuthenticatedUser();
        if (result) {
          setEmail(result.attributes.email);
          setInitials(result.attributes.email.substring(0, 2).toUpperCase());
        }
      } catch (err) {}
    }
    getUser();
  }, []);

  const fetchData = async () => {
    try {
      const fetchAdded = await API.graphql(graphqlOperation(listRequests));
      const fetchDeleted = await API.graphql(graphqlOperation(listRequests));

      const added = fetchAdded.data.listRequests.items;
      const deleted = fetchDeleted.data.listRequests.items;

      var fetch = added.concat(deleted);

      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) {
          return -1;
        }
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return 0;
      }
      fetch.sort(compare);
      fetch.reverse();

      var items = [];
      const now = new Date().getTime();
      for (let i = 0; i < fetch.length; i++) {
        var date = new Date(fetch[i].updatedAt).getTime();
        if (now - date < 86400000) {
          items.push(fetch[i]);
        }
      }

      var notifications = [];
      for (let i = 0; i < items.length; i++) {
        if (!items[i]._deleted) {
          notifications.push(
            <MenuItem className="nav-notifications" onClick={handleCloseNotification} key={items[i].id}>
              <AddCircleOutlineIcon className="success-notification" />
              Hai aggiunto l'omologa <b>&nbsp;{items[i].id}&nbsp;</b>
            </MenuItem>
          );
        }
        if (items[i]._deleted) {
          notifications.push(
            <MenuItem className="nav-notifications" onClick={handleCloseNotification} key={items[i].id}>
              <RemoveCircleOutlineIcon className="error-notification" />
              Hai cancellato l'omologa<b>&nbsp;{items[i].id}&nbsp;</b>
            </MenuItem>
          );
        }
      }
      if (notifications) {
        setNotificationRows(notifications);
        setNotificationCount(notifications.length);
      }
    } catch (err) {}
  };
  fetchData();

  const handleClickNotification = event => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = event => {
    switch (event.currentTarget.id) {
      default:
        break;
    }
    setAnchorElNotification(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} className="navbar">
        <Toolbar className="navbar">
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              padding: "10px 15px",
              ...(open && { display: "none" }),
              "@media (max-width: 600px)": { display: "none" },
            }}
            className="nav-open">
            <MenuIcon color="primary" className="nav-icon" />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            edge="start"
            sx={{
              padding: "10px 15px",
              ...(!open && { display: "none" }),
              "@media (max-width: 600px)": { display: "none" },
            }}
            className="nav-open">
            <MenuOpenIcon color="primary" className="nav-icon" />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <a href={pathname}>
              <img src={LogoSmall} alt="B-Energy S.p.A." className="nav-logo" />
            </a>
          </Typography>
          <Typography mr={3} className="nav-name">
            {email}
          </Typography>
          <IconButton color="default" edge="start" sx={{ marginRight: 2 }} className="pointer" onClick={handleClickNotification}>
            <Badge badgeContent={notificationCount} className="nav-badge" color="primary">
              <NotificationsNoneIcon className="nav-icon" />
            </Badge>
          </IconButton>

          <Menu
            id="notification-menu"
            anchorEl={anchorElNotification}
            open={notification}
            onClose={handleCloseNotification}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}>
            <Toolbar>
              <Typography className="notifications-head" component="div">
                <span>Notifiche (ultime 24h)</span>
                <IconButton className="reload-button">
                  <RefreshIcon />
                </IconButton>
              </Typography>
            </Toolbar>
            {notificationRows}
          </Menu>

          <Avatar className="pointer" onClick={() => navTo("/account")} sx={{ backgroundColor: "#014998" }}>
            {initials}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} onBlur={handleDrawerClose}>
        <DrawerHeader />
        <List>
          <Tooltip arrow title="Dashboard" placement="right">
            <ListItemButton disableRipple disableTouchRipple href="/home" sx={{ m: 1 }}>
              <ListItemIcon>
                <HomeIcon className="nav-icon" color={pathname === "/home" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Dashboard
              </Typography>
            </ListItemButton>
          </Tooltip>
        </List>

        <List>
          <ListSubheader sx={{ ...(!open && { display: "none" }) }}>
            <Typography variant="overline">Omologazione Rifiuti</Typography>
          </ListSubheader>
          <Divider variant="middle" />

          <Tooltip arrow title="Richiesta di Omologa" placement="right">
            <ListItemButton disableRipple disableTouchRipple href="/omologazione/nuova" sx={{ m: 1, mt: 2 }}>
              <ListItemIcon>
                <AddIcon className="nav-icon" color={pathname === "/omologazione/nuova" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Richiesta di Omologa
              </Typography>
            </ListItemButton>
          </Tooltip>

          <Tooltip arrow title="Richiesta di Rinnovo" placement="right">
            <ListItemButton disableRipple disableTouchRipple sx={{ m: 1 }}>
              <ListItemIcon>
                <CachedIcon className="nav-icon" color={pathname === "/omologazione/rinnovo" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Richiesta di Rinnovo
              </Typography>
            </ListItemButton>
          </Tooltip>

          <Tooltip arrow title="Prenotazione" placement="right">
            <ListItemButton disableRipple disableTouchRipple sx={{ m: 1 }}>
              <ListItemIcon>
                <EventNoteIcon className="nav-icon" color={pathname === "/omologazione/prenotazione" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Prenotazione
              </Typography>
            </ListItemButton>
          </Tooltip>

          <Tooltip arrow title="Archivio" placement="right">
            <ListItemButton disableRipple disableTouchRipple href="/omologazione/archivio" sx={{ m: 1 }}>
              <ListItemIcon>
                <FolderOpenIcon className="nav-icon" color={pathname === "/omologazione/archivio" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Archivio
              </Typography>
            </ListItemButton>
          </Tooltip>

          <ListSubheader sx={{ ...(!open && { display: "none" }) }}>
            <Typography variant="overline">Account</Typography>
          </ListSubheader>
          <Divider variant="middle" />

          <Tooltip arrow title="Profilo" placement="right">
            <ListItemButton disableRipple disableTouchRipple href="/account" sx={{ m: 1, mt: 2 }}>
              <ListItemIcon>
                <AccountCircleIcon className="nav-icon" color={pathname === "/account" ? "disabled" : "primary"} />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Profilo
              </Typography>
            </ListItemButton>
          </Tooltip>

          <Tooltip arrow title="Logout" placement="right">
            <ListItemButton
              disableRipple
              disableTouchRipple
              onClick={() => {
                signOut();
              }}
              sx={{ m: 1 }}>
              <ListItemIcon>
                <ExitToAppIcon className="nav-icon" color="error" />
              </ListItemIcon>
              <Typography className="nav-text" sx={{ mt: 0.2 }}>
                Logout
              </Typography>
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>
    </Box>
  );
}
