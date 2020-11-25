import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { signIn } from './userSlice';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const dispatch = useDispatch();

  const handleSignIn = (email, password) => {
    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    setIsVerified(emailRegex.test(email) && password.length > 7);
  }, [email, password]);

  return (
    <form
      id="signin-form"
      className="auth-form"
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        id="auth-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
        label="Email"
      />
      <TextField
        id="auth-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        className="form-input"
        type="password"
      />
      <Button
        type="submit"
        disabled={!isVerified}
        className="auth-button"
        onClick={() => handleSignIn(email, password)}
      >
        Sign In
      </Button>
    </form>
  );
};
