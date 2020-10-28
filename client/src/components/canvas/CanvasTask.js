import React from 'react';
import { HelpOutlineRounded, ReplayRounded } from '@material-ui/icons';
import { IconButton, Tooltip, Fade } from '@material-ui/core';
import CanvasModal from './CanvasModal';
import placeholder from '../../assets/kana_stroke_order/placeholder.png';

class CanvasTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      img: placeholder,
    };
  }

  toggleModal = () => {
    return (
      this.props.abc &&
      this.props.task &&
      import(
        `../../assets/kana_stroke_order/${this.props.abc}/${this.props.task}.gif`
      ).then((imgObj) =>
        this.setState((prevState) => ({
          isModalActive: !prevState.isModalActive,
          img: imgObj.default,
        })),
      )
    );
  };

  handleTaskChange = () => {
    this.setState({ isModalActive: false });
    return this.props.getTask(this.props.answer);
  };

  render() {
    const taskMessage = (
      <span id="new-canvas-task">
        Draw <b>"{this.props.task}"</b> in <i>{this.props.abc}</i>
      </span>
    );
    return (
      <div id="task-container">
        <Tooltip
          title="Get a hint"
          TransitionComponent={Fade}
          placement="bottom-start"
          arrow
          classes={{ tooltip: 'controls-tooltip' }}
        >
          <IconButton onClick={this.toggleModal}>
            <HelpOutlineRounded fontSize="large" />
          </IconButton>
        </Tooltip>

        <span id="task-message">{taskMessage}</span>
        <Tooltip
          title="Next task"
          TransitionComponent={Fade}
          placement="bottom-end"
          arrow
          classes={{ tooltip: 'controls-tooltip' }}
        >
          <IconButton onClick={this.handleTaskChange}>
            <ReplayRounded fontSize="large" />
          </IconButton>
        </Tooltip>
        <CanvasModal
          img={this.state.img}
          active={this.state.isModalActive}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default CanvasTask;
