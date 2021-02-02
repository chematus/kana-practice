/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerformanceDisplay from 'components/utils/PerformanceDisplay';
import { getPickerTask, getKana } from 'components/utils/TaskGenerator';
import PickerOption from './PickerOption';

import {
  pickerTaskCompleted,
  selectPickerStats,
  exportStats,
  selectIsLoggedIn,
} from 'components/profile/userSlice';

const TRANSITION_TIMEOUT = 500;

export default () => {
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { correct, total } = useSelector(selectPickerStats);

  const getTask = (current) => {
    const pickerTask = getPickerTask(current);
    setClicked(false);
    setTask(pickerTask.task);
    setAnswer(pickerTask.answer);
    setOptions(pickerTask.options);
    return task;
  };

  const handleOptionClick = () => {
    try {
      setClicked(true);
      if (answer === selectedOption) {
        dispatch(pickerTaskCompleted({ isCorrect: true }));
      } else {
        dispatch(
          pickerTaskCompleted({
            isCorrect: false,
            kana: getKana(answer, task),
          }),
        );
      }
      setSelectedOption(selectedOption);

      setTimeout(() => {
        setSelectedOption('');
        return getTask(answer);
      }, TRANSITION_TIMEOUT);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTask();
    return () => isLoggedIn && dispatch(exportStats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="picker-container">
      <div id="picker-performance">
        <PerformanceDisplay correct={correct} total={total} />
      </div>
      <div id="picker-task" data-testid="picker-task">
        {task}
      </div>
      <div id="picker-desc">Pick correct transcription</div>
      <div id="picker-options-wrapper">
        {options.map((item, key) => (
          <PickerOption
            key={key}
            item={item}
            selected={selectedOption === item}
            correct={answer === item}
            handleClick={!clicked && handleOptionClick}
          />
        ))}
      </div>
    </div>
  );
};
