import React from 'react';
import Fade from '@material-ui/core/Fade';
import { CirclePicker } from 'react-color';

export default ({ active, onChange }) => {
  return (
    <Fade in={active}>
      <div id="color-picker-container">
        <CirclePicker
          width="auto"
          circleSize={20}
          circleSpacing={5}
          onChange={onChange}
          colors={[
            '#f44336',
            '#e91e63',
            '#9c27b0',
            '#673ab7',
            '#3f51b5',
            '#2196f3',
            '#555555',
            '#009688',
          ]}
        />
      </div>
    </Fade>
  );
};
