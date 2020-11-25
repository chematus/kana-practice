import React from 'react';
import Button from '@material-ui/core/Button';
import { MoodBadRounded } from '@material-ui/icons';

export default ({ message }) => {
  return (
    <div id="not-found">
      <div id="error-text">
        <MoodBadRounded id="not-found-svg" />
        <span>{message}</span>
      </div>
      <Button id="home-button" href="/">
        Go Home
      </Button>
    </div>
  );
};
