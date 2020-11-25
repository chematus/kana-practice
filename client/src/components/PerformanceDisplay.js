import React from 'react';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

const getPerformance = (correct, total) => {
  return Math.round((correct / total) * 100);
};

const getGrade = (p) => {
  switch (true) {
    case p < 40:
      return 'Bad';
    case p < 70:
      return 'Good';
    case p < 90:
      return 'Amazing';
    case p <= 100:
      return 'Perfect';
    default:
      return false;
  }
};

export default ({ correct, total }) => {
  return (
    total > 4 &&
    (correct ? (
      <Tooltip
        title={`${correct} of ${total} correct (${getPerformance(
          correct,
          total,
        )}%)`}
        TransitionComponent={Fade}
        placement="top"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          {getGrade(getPerformance(correct, total)) || ''}
          <sup>*</sup>
        </span>
      </Tooltip>
    ) : (
      <span>{total} completed</span>
    ))
  );
};
