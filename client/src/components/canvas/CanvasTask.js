import React, { useState } from 'react';
import HelpOutlineRounded from '@material-ui/icons/HelpOutlineRounded';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import CanvasModal from './CanvasModal';

export default ({ taskObj: { task, answer, abc }, getTask }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    return setIsModalActive((current) => !current);
  };

  const handleTaskChange = () => {
    setIsModalActive(false);
    getTask(answer);
  };

  return (
    <div id="task-container">
      <Tooltip
        title="Get a hint"
        TransitionComponent={Fade}
        placement="bottom-start"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <IconButton onClick={toggleModal} data-testid="canvas-hint">
          <HelpOutlineRounded fontSize="large" />
        </IconButton>
      </Tooltip>

      <span id="task-message">
        <span id="new-canvas-task">
          Draw <b>"{task}"</b> in <i>{abc}</i>
        </span>
      </span>
      <Tooltip
        title="Next task"
        TransitionComponent={Fade}
        placement="bottom-end"
        arrow
        classes={{ tooltip: 'controls-tooltip' }}
      >
        <IconButton onClick={handleTaskChange} data-testid="canvas-task">
          <ReplayRounded fontSize="large" />
        </IconButton>
      </Tooltip>
      <CanvasModal
        task={task}
        abc={abc}
        active={isModalActive}
        toggleModal={toggleModal}
      />
    </div>
  );
};
