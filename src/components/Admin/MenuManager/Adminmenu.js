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
import LaunchIcon from "@material-ui/icons/Launch";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Container, Grid, Card, CardContent, Box } from "@material-ui/core";
import ItemAddition from "./AdminMenuItemAddition";
import AdminMenuItesm from "./AdminMenuItems";
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
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginRight: "10px",
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
    height: 38,
    width: 38,
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

function App() {
  const classes = useStyles();
  const [data, updatedata] = useState(null);
  const [itemadder, updateitemadder] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function varupdater() {
    updateitemadder(true);
  }
  useEffect(() => {
    async function op() {
      handleOpen();
      var x = await axios.post(
        "https://yumtrip-backend.onrender.com/GetItemsForMenuManager",
        {
          session: localStorage.getItem("SESS"),
        }
      );
      if (x.data.bool === true) {
        updatedata(x.data);
      }
      handleClose();
    }
    op();
  }, []);
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" className={classes.menu}>
        <Grid item xl={1}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">
                  Menu Manager
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    window.open(
                      "https://yumtrip.netlify.app/#/store/" + data.key
                    );
                  }}
                >
                  <LaunchIcon />
                </IconButton>
                <ItemAddition />
              </div>
            </div>
          </Card>
        </Grid>
      </Container>

      {data === true && data.length === 0 ? (
        <Container maxWidth="sm" className={classes.menu}>
          <Typography component="h6" variant="h6">
            Looks like you have not added any items to your menu.
          </Typography>
        </Container>
      ) : (
        ""
      )}
      {data &&
        data.items.map((dishh) => (
          <AdminMenuItesm
            keyy={dishh.Itemkey}
            name={dishh.name}
            price={dishh.price}
            available={dishh.available}
          />
        ))}
    </>
  );
}

export default App;
