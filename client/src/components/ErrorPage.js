import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MoodBadRounded from '@material-ui/icons/MoodBadRounded';

export default ({ message }) => (
  <div id="not-found">
    <div id="error-text">
      <MoodBadRounded id="not-found-svg" />
      <span>{message}</span>
    </div>
    <Button component={Link} id="home-button" to="/">
      Go Home
    </Button>
  </div>
);
