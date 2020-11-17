import React from 'react';
import { Fade, IconButton, Tooltip } from '@material-ui/core';
import {
  UndoRounded,
  DeleteRounded,
  PaletteRounded,
  BrushRounded,
  ErrorOutlineRounded,
} from '@material-ui/icons';
import ColorPicker from './ColorPicker';
import SizeRange from './SizeRange';

export default ({
  isCanvasActive,
  undo,
  clear,
  togglePicker,
  toggleRange,
  isRangeActive,
  color,
  onColorChange,
  isPickerActive,
  onSizeChange,
}) => {
  return (
    <div id="controls">
      <Tooltip
        title="Undo [C]"
        TransitionComponent={Fade}
        placement="left"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          <IconButton disabled={!isCanvasActive} onClick={undo}>
            <UndoRounded fontSize="large" className="canvas-control" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title="Clear [X]"
        TransitionComponent={Fade}
        placement="left"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          <IconButton disabled={!isCanvasActive} onClick={clear}>
            <DeleteRounded fontSize="large" className="canvas-control" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title="Change brush size [C]"
        TransitionComponent={Fade}
        placement="left"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          <IconButton disabled={!isCanvasActive} onClick={toggleRange}>
            <BrushRounded fontSize="large" className="canvas-control" />
            <SizeRange onChange={onSizeChange} active={isRangeActive} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title="Change brush color [V]"
        TransitionComponent={Fade}
        placement="left"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <span>
          <IconButton
            disabled={!isCanvasActive}
            onClick={togglePicker}
            style={{
              color,
              filter: `drop-shadow(0 0 2px ${color})`,
            }}
          >
            <PaletteRounded fontSize="large" />
            <ColorPicker active={isPickerActive} onChange={onColorChange} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title="The handwriting recognition system is not ideal, so if you encounter any errors feel free to skip the challenge."
        TransitionComponent={Fade}
        placement="left"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <IconButton id="canvas-disclaimer" disableFocusRipple disableRipple>
          <ErrorOutlineRounded fontSize="large" className="canvas-control" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
