import React, { Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import logo from './assets/logo.svg';
import MessageToast from './components/MessageToast';
import CanvasOCR from './components/canvas/CanvasOCR';
import './styles/App.scss';

const Canvas = React.lazy(() => import('./components/canvas/Canvas'));
const Matcher = React.lazy(() => import('./components/matcher/Matcher'));
const Picker = React.lazy(() => import('./components/picker/Picker'));
const HowTo = React.lazy(() => import('./components/HowTo'));
const Home = React.lazy(() => import('./components/Home'));
const Profile = React.lazy(() => import('./components/profile/Profile'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: '#555',
        },
        secondary: {
          main: '#999',
        },
      },
    });
    //this.OCR = new CanvasOCR();
    //this.canvasReady = this.OCR.prepareWorker();
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Router>
          <Header logo={logo} />
          <main>
            <Suspense
              fallback={<CircularProgress className="circular-loader" />}
            >
              <Switch>
                <Route path="/canvas">
                  <Canvas /*OCR={this.OCR} isReady={this.canvasReady}*/ />
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
  }
}

export default App;
