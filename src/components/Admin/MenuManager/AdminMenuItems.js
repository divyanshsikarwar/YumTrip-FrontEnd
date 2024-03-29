import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiPhoneNumber from "material-ui-phone-number";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Container, Grid, Card, CardContent, Box } from "@material-ui/core";
import ItemEdit from "./AdminMenuItemEdit";
import data from "../../data";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  menuButton: {
    flexGrow: 1,
    color: "#0D1B2A",
  },

  menu: {
    marginTop: "20px",
  },

  controls: {
    display: window.screen.width < 650 ? "" : "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
    marginRight: "5px",
  },

  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",

    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  drawerHeader: {
    backgroundColor: "#3FDE82",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  dishname: {
    fontSize: "15px",
    flexGrow: 1,
    marginRight: "100px",
  },
  dishcount: {
    fontSize: "15px",
  },
  fname: {
    marginRight: "155px",
  },

  playIcon: {
    height: 31,
    width: 31,
    fontSize: "small",
  },
  warning: {
    color: "#b83e3e",
  },
  centre: {
    marginTop: "15px",
    textAlign: "center",
    alignContent: "center",
  },
  button: {
    marginTop: "10px",
    marginLeft: "55px",
    marginBottom: "-10px",
  },
  header: {
    backgroundColor: "#3FDE82",
  },
}));

function App(dish) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const [available, updateAvailable] = useState(dish.available);
  const [loading, setLoading] = React.useState(false);

  async function AvailabilityChange(key) {
    if (available === true) {
      updateAvailable(false);
    } else {
      updateAvailable(true);
    }

    setLoading((prevLoading) => !prevLoading);
    const ret = await axios.post(
      "https://yumtrip-backend.onrender.com/adminItemEdit",
      {
        session: localStorage.getItem("SESS"),
        type: "availability",
        change: !available,
        itemkey: key,
      }
    );
    setLoading((prevLoading) => !prevLoading);
  }

  return (
    <>
      <Container maxWidth="xl" className={classes.menu}>
        <Grid item xl={1}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  component={window.screen.width < 650 ? "h6" : "h5"}
                  variant={window.screen.width < 650 ? "h6" : "h5"}
                >
                  {dish.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {dish.price} ₹
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? "500ms" : "1000ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress size="20px" />
                </Fade>
                <Switch
                  checked={available}
                  onChange={() => {
                    AvailabilityChange(dish.keyy);
                  }}
                />
                <ItemEdit
                  keyy={dish.keyy}
                  name={dish.name}
                  price={dish.price}
                  select={dish.available === true ? 1 : 2}
                />
              </div>
            </div>
          </Card>
        </Grid>
      </Container>
    </>
  );
}

export default App;
