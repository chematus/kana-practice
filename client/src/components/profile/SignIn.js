import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default ({ handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(emailRegex.test(email) && password.length > 7);
  }, [email, password]);
  return (
    <form id="signin-form" className="auth-form" noValidate autoComplete="off">
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
        disabled={!isVerified}
        className="auth-button"
        onClick={() => handleSubmit(email, password)}
      >
        Sign In
      </Button>
    </form>
  );
};
