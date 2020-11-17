import React, { useState, useEffect, useRef } from 'react';
import CanvasControls from './CanvasControls';
import ReactCanvasDraw from 'react-canvas-draw';
import { CircularProgress, Fade } from '@material-ui/core';
import { getCanvasTask } from '../TaskGenerator';
import CanvasTask from './CanvasTask';
import HotkeyHandler from 'react-hot-keys';
import ValidatorDisplay from '../ValidatorDisplay';

export default ({ OCR, isReady }) => {
  const canvasRef = useRef(null);
  const resImageRef = useRef(null);

  const [color, setColor] = useState('#555555');
  const [size, setSize] = useState(5);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [isRangeActive, setIsRangeActive] = useState(false);
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [taskObj, setTaskObj] = useState({ task: '', answer: '', abc: '' });

  const clear = () => {
    try {
      canvasRef.current.clear();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };

  const undo = () => {
    try {
      canvasRef.current.undo();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };

  const togglePicker = () => {
    setIsPickerActive((current) => !current);
    setIsRangeActive(false);
  };

  const toggleRange = () => {
    setIsRangeActive((current) => !current);
    setIsPickerActive(false);
  };

  const getImageFromCanvas = () => {
    const el = document.getElementsByTagName('canvas')[1];
    const resContext = resImageRef.current.getContext('2d');
    resContext.clearRect(
      0,
      0,
      resImageRef.current.width,
      resImageRef.current.height,
    );
    resContext.drawImage(
      el,
      0,
      0,
      resImageRef.current.width,
      resImageRef.current.height,
    );
    return resImageRef.current.toDataURL('image/png');
  };

  const handleChange = () => {
    setIsPickerActive(false);
    setIsRangeActive(false);
    setIsCorrect(null);
    OCR.parseImg(getImageFromCanvas())
      .then((data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Input: ${data.trim()} 
            Task: ${taskObj.answer}
            Check 1: ${data.trim() === taskObj.answer}`,
          );
        }
        return data;
      })
      .then((data) => {
        if (taskObj.answer === data.trim()) {
          setIsCorrect(true);
          getTask(taskObj.answer);
        }
      });
  };

  const getTask = (current) => {
    const task = getCanvasTask(current);
    clear();
    setTaskObj(task);
  };

  const onColorChange = (colorObj) => {
    setColor(colorObj.hex);
  };

  const onSizeChange = (e, size) => {
    setSize(size);
  };

  const onKeyDown = (keyName, e, handle) => {
    if (!isCanvasActive) {
      return false;
    }
    switch (keyName) {
      case 'z':
        return undo();
      case 'x':
        return clear();
      case 'c':
        return toggleRange();
      case 'v':
        return togglePicker();
      default:
        return false;
    }
  };

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsCanvasActive(isReady);
  }, [isReady]);

  return (
    <HotkeyHandler keyName="z, x, c, v" onKeyDown={onKeyDown}>
      <div id="canvas-task">
        <CanvasTask taskObj={{ ...taskObj }} getTask={() => getTask()} />

        <div id="canvas-container" className={isCanvasActive ? '' : 'disabled'}>
          <CanvasControls
            clear={clear}
            undo={undo}
            togglePicker={togglePicker}
            toggleRange={toggleRange}
            onColorChange={onColorChange}
            onSizeChange={onSizeChange}
            color={color}
            isCanvasActive={isCanvasActive}
            isPickerActive={isPickerActive}
            isRangeActive={isRangeActive}
          />
          <ReactCanvasDraw
            id="canvas-main"
            hideGrid
            disabled={!isCanvasActive}
            lazyRadius={1}
            brushColor={color}
            brushRadius={size}
            catenaryColor={color}
            ref={canvasRef}
            onChange={handleChange}
          />
          <div id="canvas-validator">
            <ValidatorDisplay correct={isCorrect} />
          </div>
          <Fade in={!isCanvasActive}>
            <CircularProgress className="circular-loader" />
          </Fade>
          <canvas id="copy" ref={resImageRef} />
        </div>
      </div>
    </HotkeyHandler>
  );
};
