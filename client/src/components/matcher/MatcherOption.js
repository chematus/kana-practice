import { Button } from '@material-ui/core';
import React from 'react';

export default (props) => {
  return (
    <Button
      id={props.id}
      className={props.active ? 'matcher-option-active' : ''}
      disabled={props.disabled}
      onClick={(e) => props.handleClick(props.column, props.char, e)}
    >
      {props.char}
    </Button>
  );
};
