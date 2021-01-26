import React, { Suspense, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { autoSignIn } from 'components/profile/userSlice';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import logo from 'assets/logo.svg';
import MessageToast from 'components/utils/MessageToast';
import 'styles/App.scss';

const Canvas = React.lazy(() => import('components/canvas/Canvas'));
const Matcher = React.lazy(() => import('components/matcher/Matcher'));
const Picker = React.lazy(() => import('components/picker/Picker'));
const HowTo = React.lazy(() => import('components/HowTo'));
const Home = React.lazy(() => import('components/Home'));
const Profile = React.lazy(() => import('components/profile/Profile'));
const ErrorPage = React.lazy(() => import('components/ErrorPage'));

const PRIMARY_THEME_COLOR = '#5e5e5e';
const SECONDARY_THEME_COLOR = '#999';

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoSignIn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: PRIMARY_THEME_COLOR,
      },
      secondary: {
        main: SECONDARY_THEME_COLOR,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header logo={logo} />
        <main>
          <Suspense fallback={<CircularProgress className="circular-loader" />}>
            <Switch>
              <Route path="/canvas">
                <Canvas />
              </Route>
              <Route path="/pick">
                <Picker />
              </Route>
              <Route path="/match">
                <Matcher />
              </Route>
              <Route path="/howto">
                <HowTo />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route>
                <ErrorPage message="Page not found" />
              </Route>
            </Switch>
          </Suspense>
        </main>
        <MessageToast />
        <Footer />
      </Router>
    </ThemeProvider>
  );
};
