import Button from '@material-ui/core/Button';
import React from 'react';

export default ({ id, active, disabled, column, char, handleClick }) => {
  return (
    <Button
      id={id}
      className={active ? 'matcher-option-active' : ''}
      disabled={disabled}
      onClick={(e) => handleClick(column, char, e)}
    >
      {char}
    </Button>
  );
};
