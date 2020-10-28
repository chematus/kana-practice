import React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(err, compInfo) {
    console.log(err, compInfo);
  }

  render() {
    return <ErrorPage message="Something went wrong" />;
  }
}
