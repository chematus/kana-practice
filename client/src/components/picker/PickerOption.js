import { Button } from '@material-ui/core';
import React from 'react';
import ValidatorDisplay from '../ValidatorDisplay';

export default (props) => {
  let correct = null;
  if (props.selected) {
    if (props.correct) {
      correct = true;
    } else {
      correct = false;
    }
  }
  return (
    <div className="picker-option">
      <ValidatorDisplay correct={correct} />
      <Button
        className={props.selected ? 'picker-option-selected' : ''}
        onClick={(e) => props.handleClick && props.handleClick(e, props.item)}
      >
        {props.item}
      </Button>
    </div>
  );
};
