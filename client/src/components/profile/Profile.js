import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Stats from './Stats';

export default (props) => {
  const [tabActive, setTabActive] = useState(0);
  const [user, setUser] = useState({});

  const onTabChange = (e, val) => {
    setTabActive(val);
  };

  const handleSignIn = (email, password) => {
    setUser({
      id: 1,
      username: 'test',
      email: 'test@test.com',
      stats: {
        picker: { total: 10, correct: 5 },
        matcher: { total: 50, correct: 48 },
        canvas: { total: 45 },
      },
    });
  };

  const handleSignUp = (username, email, password) => {
    setUser({
      id: 1,
      username: 'test',
      email: 'test@test.com',
      stats: {
        picker: { total: 10, correct: 5 },
        matcher: { total: 50, correct: 48 },
        canvas: { total: 45 },
      },
    });
  };

  const handleLogout = () => {
    setUser({});
  };

  return (
    <>
      <Paper square id="auth-container">
        {user.id ? (
          <Stats user={user} handleLogout={handleLogout} />
        ) : (
          <>
            <Tabs
              id="auth-tabs"
              value={tabActive}
              onChange={onTabChange}
              indicatorColor="secondary"
              textColor="primary"
            >
              <Tab className="auth-tab" label="Sign In" />
              <Tab className="auth-tab" label="Sign Up" />
            </Tabs>
            {tabActive === 0 ? (
              <SignIn handleSubmit={handleSignIn} />
            ) : (
              <SignUp handleSubmit={handleSignUp} />
            )}
          </>
        )}
      </Paper>
    </>
  );
};
