import React from 'react';
import { Button } from '@material-ui/core';
import { MoodBadRounded } from '@material-ui/icons';

export default (props) => {
  return (
    <div id="not-found">
      <div id="error-text">
        <MoodBadRounded id="not-found-svg" />
        <span>{props.message}</span>
      </div>
      <Button id="home-button" href="/">
        Go Home
      </Button>
    </div>
  );
};
