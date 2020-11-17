import React from 'react';
import { Fade, Slider } from '@material-ui/core';

export default ({ active, onChange }) => {
  return (
    <Fade in={active}>
      <div id="size-range-container">
        <Slider
          min={5}
          max={10}
          step={1}
          orientation="vertical"
          defaultValue={5}
          valueLabelDisplay="off"
          onChangeCommitted={onChange}
        />
      </div>
    </Fade>
  );
};
