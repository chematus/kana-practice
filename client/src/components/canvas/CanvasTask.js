import React, { useState } from 'react';
import HelpOutlineRounded from '@material-ui/icons/HelpOutlineRounded';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import CanvasModal from './CanvasModal';
import placeholder from '../../assets/kana_stroke_order/placeholder.png';

export default ({ taskObj: { task, answer, abc }, getTask }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [img, setImg] = useState(placeholder);

  const toggleModal = () => {
    return (
      abc &&
      task &&
      import(`../../assets/kana_stroke_order/${abc}/${task}.gif`).then(
        (imgObj) => {
          setIsModalActive((current) => !current);
          setImg(imgObj.default);
        },
      )
    );
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
        <IconButton onClick={toggleModal}>
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
        <IconButton onClick={handleTaskChange}>
          <ReplayRounded fontSize="large" />
        </IconButton>
      </Tooltip>
      <CanvasModal img={img} active={isModalActive} toggleModal={toggleModal} />
    </div>
  );
};
