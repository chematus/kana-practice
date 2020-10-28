import React from 'react';
import CanvasControls from './CanvasControls';
import ReactCanvasDraw from 'react-canvas-draw';
import { CircularProgress, Fade } from '@material-ui/core';
import TaskGenerator from '../TaskGenerator';
import CanvasTask from './CanvasTask';
import HotkeyHandler from 'react-hot-keys';
import CanvasOCR from './CanvasOCR';
import ValidatorDisplay from '../ValidatorDisplay';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.getCanvasTask = TaskGenerator.getCanvasTask;
    const task = this.getCanvasTask();

    this.state = {
      color: '#555555',
      size: 5,
      isPickerActive: false,
      isRangeActive: false,
      isCanvasActive: false,
      correct: null,
      ...task,
    };

    this.canvasRef = React.createRef();
    this.resImageRef = React.createRef();

    //this.OCR = new CanvasOCR();
  }

  canvasClear = () => {
    try {
      this.canvasRef.current.clear();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };

  canvasUndo = () => {
    try {
      this.canvasRef.current.undo();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };

  canvasTogglePicker = () => {
    this.setState((prevState) => ({
      isPickerActive: !prevState.isPickerActive,
      isRangeActive: false,
    }));
  };

  canvasToggleRange = () => {
    this.setState((prevState) => ({
      isRangeActive: !prevState.isRangeActive,
      isPickerActive: false,
    }));
  };

  canvasToggleActive = () => {
    this.setState((prevState) => ({
      isCanvasActive: !prevState.isCanvasActive,
    }));
  };

  getImageFromCanvas = () => {
    const el = document.getElementsByTagName('canvas')[1];
    const resContext = this.resImageRef.current.getContext('2d');
    resContext.clearRect(
      0,
      0,
      this.resImageRef.current.width,
      this.resImageRef.current.height,
    );
    resContext.drawImage(
      el,
      0,
      0,
      this.resImageRef.current.width,
      this.resImageRef.current.height,
    );
    return this.resImageRef.current.toDataURL('image/png');
  };

  canvasHandleChange = () => {
    this.setState({
      isPickerActive: false,
      isRangeActive: false,
      correct: null,
    });
    this.OCR.parseImg(this.getImageFromCanvas())
      /** dev data start */
      .then((data) => {
        console.log(
          `Input: ${data.trim()} 
          Task: ${this.state.answer}
          Check 1: ${data.trim() === this.state.answer}`,
        );
        return data;
      })
      /** dev data end */
      .then((data) => {
        if (this.state.answer === data.trim()) {
          this.setState({ correct: true });
          return this.getTask(this.state.answer);
        }
      });
  };

  getTask = (current) => {
    const task = this.getCanvasTask(current);
    this.canvasClear();
    this.setState({ ...task });
    return task;
  };

  onColorChange = (colorObj) => {
    this.setState({ color: colorObj.hex });
  };

  onSizeChange = (e, size) => {
    this.setState({ size });
  };

  onKeyDown = (keyName, e, handle) => {
    if (!this.isCanvasActive) {
      return false;
    }
    switch (keyName) {
      case 'z':
        return this.canvasUndo();
      case 'x':
        return this.canvasClear();
      case 'c':
        return this.canvasToggleRange();
      case 'v':
        return this.canvasTogglePicker();
      default:
        return false;
    }
  };

  componentDidMount() {
    //this.OCR.prepareWorker().then(() => this.canvasToggleActive());
  }

  componentWillUnmount() {
    //this.OCR.terminateWorker();
  }

  render() {
    return (
      <HotkeyHandler keyName="z, x, c, v" onKeyDown={this.onKeyDown}>
        <div id="canvas-task">
          <CanvasTask
            task={this.state.task}
            abc={this.state.abc}
            answer={this.state.answer}
            getTask={this.getTask}
          />

          <div
            id="canvas-container"
            className={this.state.isCanvasActive ? '' : 'disabled'}
          >
            <CanvasControls
              clear={this.canvasClear}
              undo={this.canvasUndo}
              togglePicker={this.canvasTogglePicker}
              toggleRange={this.canvasToggleRange}
              onColorChange={this.onColorChange}
              onSizeChange={this.onSizeChange}
              color={this.state.color}
              isCanvasActive={this.state.isCanvasActive}
              isPickerActive={this.state.isPickerActive}
              isRangeActive={this.state.isRangeActive}
            />
            <ReactCanvasDraw
              id="canvas-main"
              hideGrid
              disabled={!this.state.isCanvasActive}
              lazyRadius={1}
              brushColor={this.state.color}
              brushRadius={this.state.size}
              catenaryColor={this.state.color}
              ref={this.canvasRef}
              onChange={this.canvasHandleChange}
            />
            <div id="canvas-validator">
              <ValidatorDisplay correct={this.state.correct} />
            </div>
            <Fade in={!this.state.isCanvasActive}>
              <CircularProgress className="circular-loader" />
            </Fade>
            <canvas id="copy" ref={this.resImageRef} />
          </div>
        </div>
      </HotkeyHandler>
    );
  }
}

export default Canvas;
