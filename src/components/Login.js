import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import FormData from "form-data";
import { Alert } from "reactstrap";
import {AppContext} from "../context"; 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const {setCurrentAccount} = useContext(AppContext);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };
  const handleSignupClick = () => {
    history.push("/signup");
  };

  const handleSignInClick = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", account.username);
    formData.append("password", account.password);
    axios
      .post(`${config.apiUrl}/login`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("account", response.data.account);
        setCurrentAccount(response.data.account)
        history.push("/images");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Incorrect user credentials!");
        setIsError(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => {
              handleInputChange(event);
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              handleSignInClick(event);
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  handleSignupClick();
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
        <Alert color="danger" hidden={!isError}>
          {errorMessage}
        </Alert>
      </div>
    </Container>
  );
}
