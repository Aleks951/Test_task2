import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import Alert from '@material-ui/core/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch } from 'react-redux';

function Copyright() {

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "15px"
        }}
      >
        <a href="/ru">
          Русский
                </a>
        <a href="/uk" >
          Українська
                </a>
        <a href="/en">
          English
                </a>
        <a href="/pl" >
          Polski
                </a>
        <a href="/bg" >
          Български
                </a>
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
      </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { locale, stateForm } = useSelector((store) => ({
    locale: store.locale,
    stateForm: store.stateForm
  }))
  const dispatch = useDispatch();

  const [alertOpen, setAlertOpen] = useState({
    open: false,
    message: ''
  });
  const [severity, setSeverity] = useState('success');

  if (Object.entries(locale).length === 0) {
    return (<></>);
  };

  const router = useRouter();

  const submit = () => {
    fetch('https://dev1.glaz.systems/api/v1.2/authenticate/login?include=user%2Cpermissions', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stateForm)
    })
      .then(res => {
        if (
          res.status === 422 ||
          res.status === 400 ||
          res.status === 500
        ) {
          setSeverity('error');
        } else {
          setSeverity('success');
        };
        return res.json();
      })
      .then(data => {
        if (severity === 'success') {
          cookie.set('access_token', data.access_token)
          const { lang } = router.query;
          if (lang === undefined) {
            router.push(`/ru/access`)
          } else {
            router.push(`/${lang}/access`)
          };
        }
        setAlertOpen({
          open: true,
          message: data.email
        });
      })
  };

  const changedForm = (name, value) => {
    dispatch({ type: 'CHANGEDFORM', name, value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Collapse in={alertOpen.open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen({ open: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertOpen.message}
        </Alert>
      </Collapse>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {locale.login.enter}
        </Typography>
        <form
          className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={locale.login.email}
            name="email"
            onChange={(e) => {
              changedForm('email', e.target.value);
            }}
            autoComplete="email"
            value={stateForm.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => {
              changedForm('password', e.target.value);
            }}
            label={locale.login.password}
            type="password"
            value={stateForm.password}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={locale.login.remember_me}
          />
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {locale.login.enter}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {locale.login.lost_password}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {locale.login.dont_have_account}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box sx={{ mt: 8 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
