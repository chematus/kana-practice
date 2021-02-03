import React from 'react';
import Fade from '@material-ui/core/Fade';
import Slider from '@material-ui/core/Slider';

export default ({ active, onChange }) => (
  <Fade in={active}>
    <div id="size-range-container" data-testid="canvas-brush-size-panel">
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
