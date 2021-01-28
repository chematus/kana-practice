import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Stats from './Stats';

import { selectIsLoggedIn, selectReqStatus } from './userSlice';

export default (props) => {
  const [tabActive, setTabActive] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const reqStatus = useSelector(selectReqStatus);

  const onTabChange = (e, val) => {
    setTabActive(val);
  };

  useEffect(() => {
    setIsDisabled(reqStatus === 'processing');
  }, [reqStatus]);

  return (
    <>
      <Fade in={!isDisabled}>
        <Paper square id="auth-container">
          {isLoggedIn ? (
            <Stats />
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
              {tabActive === 0 ? <SignIn /> : <SignUp />}
            </>
          )}
        </Paper>
      </Fade>
      <Fade in={isDisabled}>
        <CircularProgress className="circular-loader" />
      </Fade>
    </>
  );
};
