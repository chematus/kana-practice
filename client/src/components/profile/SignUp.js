import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const usernameRegex = /^[\w]{4,}$/i;

export default ({ handleSubmit }) => {
  const [isPwdConfirmed, setIsPwdConfirmed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  useEffect(() => {
    setIsPwdConfirmed(password === passwordConf);
  }, [password, passwordConf]);

  useEffect(() => {
    setIsVerified(
      usernameRegex.test(username) &&
        emailRegex.test(email) &&
        password.length > 7 &&
        password === passwordConf,
    );
  }, [username, email, password, passwordConf]);

  return (
    <form id="signin-form" className="auth-form" noValidate autoComplete="off">
      <TextField
        value={username}
        error={!!username.length && !usernameRegex.test(username)}
        id="auth-name"
        className="form-input"
        label="Username"
        helperText="4 characters minimum"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        value={email}
        error={!!email.length && !emailRegex.test(email)}
        id="auth-email"
        className="form-input"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        value={password}
        error={!!password.length && password.length < 8}
        id="auth-password"
        label="Password"
        className="form-input"
        type="password"
        helperText="8 characters minimum"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        error={!!passwordConf.length && !isPwdConfirmed}
        value={passwordConf}
        id="auth-confirm"
        label="Confirm password"
        className="form-input"
        type="password"
        helperText="Passwords should match"
        onChange={(e) => setPasswordConf(e.target.value)}
      />
      <Button
        className="auth-button"
        disabled={!isVerified}
        onClick={() => handleSubmit(username, email, password)}
      >
        Sign Up
      </Button>
    </form>
  );
};
