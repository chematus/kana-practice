import React from 'react';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UndoRounded from '@material-ui/icons/UndoRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import PaletteRounded from '@material-ui/icons/PaletteRounded';
import BrushRounded from '@material-ui/icons/BrushRounded';
import ErrorOutlineRounded from '@material-ui/icons/ErrorOutlineRounded';
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
}) => (
  <div id="controls">
    <Tooltip
      title="Undo [C]"
      TransitionComponent={Fade}
      placement="left"
      arrow
      classes={{ tooltip: 'controls-tooltip' }}
    >
      <span>
        <IconButton
          disabled={!isCanvasActive}
          onClick={undo}
          data-testid="canvas-undo"
        >
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
        <IconButton
          disabled={!isCanvasActive}
          onClick={clear}
          data-testid="canvas-clear"
        >
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
        <IconButton
          disabled={!isCanvasActive}
          onClick={toggleRange}
          data-testid="canvas-brush-size"
        >
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
          data-testid="canvas-brush-color"
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
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      classes={{ tooltip: 'controls-tooltip' }}
    >
      <IconButton id="canvas-disclaimer" disableFocusRipple disableRipple>
        <ErrorOutlineRounded fontSize="large" className="canvas-control" />
      </IconButton>
    </Tooltip>
  </div>
);
