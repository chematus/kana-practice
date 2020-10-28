import React from 'react';
import { Fade, Tooltip } from '@material-ui/core';

class PerformanceDisplay extends React.Component {
  getGrade = (p) => {
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

  getPerformance = (correct, total) => {
    return Math.round((correct / total) * 100);
  };

  render() {
    const { correct, total } = this.props;
    if (total < 5) {
      return false;
    }
    const performance = this.getPerformance(correct, total);

    return (
      <Tooltip
        title={`${correct} of ${total} correct (${performance}%)`}
        TransitionComponent={Fade}
        placement="top"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          {this.getGrade(performance) || ''}
          <sup>*</sup>
        </span>
      </Tooltip>
    );
  }
}

export default PerformanceDisplay;
