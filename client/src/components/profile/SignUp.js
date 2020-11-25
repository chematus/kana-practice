import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signUp } from './userSlice';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const usernameRegex = /^[\w]{4,10}$/i;

export default (props) => {
  const [isPwdConfirmed, setIsPwdConfirmed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = (username, email, password) => {
    dispatch(signUp({ username, email, password }));
  };

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
    <form
      id="signin-form"
      className="auth-form"
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        value={username}
        error={!!username.length && !usernameRegex.test(username)}
        id="auth-name"
        className="form-input"
        label="Username"
        helperText="4-10 characters"
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
        type="submit"
        className="auth-button"
        disabled={!isVerified}
        onClick={() => handleSignUp(username, email, password)}
      >
        Sign Up
      </Button>
    </form>
  );
};
