import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signUp, selectUserStats } from './userSlice';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const usernameRegex = /^[\w]{4,10}$/i;
const PWD_MIN_LENGTH = 8;

const trim = (str) => String(str).replace(/\s/g, '');

export default () => {
  const [isPwdConfirmed, setIsPwdConfirmed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const dispatch = useDispatch();
  const stats = useSelector(selectUserStats);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp({ username, email, password, stats }));
  };

  useEffect(() => {
    setIsPwdConfirmed(password === passwordConf);
  }, [password, passwordConf]);

  useEffect(() => {
    setIsVerified(
      usernameRegex.test(username) &&
        emailRegex.test(email) &&
        password.length >= PWD_MIN_LENGTH &&
        password === passwordConf,
    );
  }, [username, email, password, passwordConf]);

  return (
    <form
      id="signin-form"
      className="auth-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSignUp}
    >
      <TextField
        value={username}
        error={!!username.length && !usernameRegex.test(username)}
        id="auth-name"
        className="form-input"
        label="Username"
        helperText="4-10 characters"
        onChange={(e) => setUsername(trim(e.target.value))}
      />
      <TextField
        value={email}
        error={!!email.length && !emailRegex.test(email)}
        id="auth-email"
        className="form-input"
        label="Email"
        onChange={(e) => setEmail(trim(e.target.value))}
      />
      <TextField
        value={password}
        error={!!password.length && password.length < PWD_MIN_LENGTH}
        id="auth-password"
        label="Password"
        className="form-input"
        type="password"
        helperText="8 characters minimum"
        onChange={(e) => setPassword(trim(e.target.value))}
      />
      <TextField
        error={!!passwordConf.length && !isPwdConfirmed}
        value={passwordConf}
        id="auth-confirm"
        label="Confirm password"
        className="form-input"
        type="password"
        helperText="Passwords should match"
        onChange={(e) => setPasswordConf(trim(e.target.value))}
      />
      <Button type="submit" className="auth-button" disabled={!isVerified}>
        Submit
      </Button>
    </form>
  );
};
