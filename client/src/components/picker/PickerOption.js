import Button from '@material-ui/core/Button';
import React from 'react';
import ValidatorDisplay from 'components/utils/ValidatorDisplay';

export default ({ selected, correct, handleClick, item }) => {
  let isCorrect = null;
  if (selected) {
    if (correct) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
  }
  return (
    <div className="picker-option">
      <ValidatorDisplay correct={isCorrect} />
      <Button
        className={selected ? 'picker-option-selected' : ''}
        onClick={(e) => handleClick && handleClick(e, item)}
      >
        {item}
      </Button>
    </div>
  );
};
