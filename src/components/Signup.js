// Template from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js
// Slightly modified by @minhqto to suit needs
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import FormData from "form-data";
import { Alert } from "reactstrap";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [accountCreationError, setAccountCreationError] = useState("");

  const handleSigninClick = () => {
    history.push("/login");
  };

  const handleInputChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
    setIsError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", account.username);
    formData.append("email", account.email);
    formData.append("password", account.password);

    axios
      .post(`${config.apiUrl}/signup`, formData)
      .then((confirmedUsername) => {
        setAccount({ username: confirmedUsername.data });
        setIsUserRegistered(true);
        setIsError(false);
        setTimeout(() => {
          //this is cheating, I know :(
          history.push("/login");
        }, 1000);
      })
      .catch((err) => {
        if (err.response.data) {
          setAccountCreationError(err.response.data);
        } else {
          setAccountCreationError("An unknown error occurred!");
        }
        setIsUserRegistered(false);
        setIsError(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          encType="multipart/form-data"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                variant="outlined"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  handleSigninClick();
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Alert color="success" hidden={!isUserRegistered}>
          Account {account.username} created! Redirecting...
        </Alert>
        <Alert color="danger" hidden={!isError}>
          {accountCreationError}
        </Alert>
      </div>
    </Container>
  );
}
