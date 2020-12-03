import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CanvasControls from './CanvasControls';
import ReactCanvasDraw from 'react-canvas-draw';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { getCanvasTask } from 'components/utils/TaskGenerator';
import lzstring from 'lz-string';
import CanvasTask from './CanvasTask';
import HotkeyHandler from 'react-hot-keys';
import ValidatorDisplay from 'components/utils/ValidatorDisplay';
import PerformanceDisplay from 'components/utils/PerformanceDisplay';

import {
  canvasTaskCompleted,
  selectCanvasStats,
  exportStats,
  selectIsLoggedIn,
} from 'components/profile/userSlice';

const apiUrl = 'http://192.168.100.11:8000/ocr';

export default (props) => {
  const canvasRef = useRef(null);
  const resImageRef = useRef(null);

  const [color, setColor] = useState('#555555');
  const [size, setSize] = useState(8);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [isRangeActive, setIsRangeActive] = useState(false);
  const [isCanvasActive, setIsCanvasActive] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null);
  const [taskObj, setTaskObj] = useState({ task: '', answer: '', abc: '' });

  const dispatch = useDispatch();
  const { total } = useSelector(selectCanvasStats);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
    const isBlank = !el
      .getContext('2d')
      .getImageData(0, 0, el.width, el.height)
      .data.some((channel) => channel !== 0);

    if (isBlank) {
      return false;
    }

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
    const result = lzstring.compress(resImageRef.current.toDataURL());
    return result;
  };

  const handleChange = (e) => {
    setIsPickerActive(false);
    setIsRangeActive(false);
    setIsCorrect(null);
    const imgBase64 = getImageFromCanvas();
    if (!imgBase64) {
      return false;
    }
    axios
      .post(apiUrl, { img: imgBase64 })
      .then(({ data: { text } }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Input: ${text} 
            Task: ${taskObj.answer}`,
          );
        }
        return text;
      })
      .then((data) => {
        if (taskObj.answer === data.trim()) {
          dispatch(canvasTaskCompleted());
          setIsCorrect(true);
          getTask(taskObj.answer);
        }
      })
      .catch((e) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(e);
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
    return () => isLoggedIn && dispatch(exportStats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HotkeyHandler keyName="z, x, c, v" onKeyDown={onKeyDown}>
      <div id="canvas-task">
        <div id="canvas-performance">
          <PerformanceDisplay total={total} />
        </div>
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
            hideInterface={true}
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
