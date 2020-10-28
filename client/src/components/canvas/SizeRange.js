import React from 'react';
import { Fade, Slider } from '@material-ui/core';

export default (props) => {
  return (
    <Fade in={props.active}>
      <div id="size-range-container">
        <Slider
          min={5}
          max={10}
          step={1}
          orientation="vertical"
          defaultValue={5}
          valueLabelDisplay="off"
          onChangeCommitted={props.onChange}
        />
      </div>
    </Fade>
  );
};
