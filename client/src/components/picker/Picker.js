import React, { useState, useEffect } from 'react';
import PerformanceDisplay from '../PerformanceDisplay';
import { getPickerTask } from '../TaskGenerator';
import PickerOption from './PickerOption';

export default (props) => {
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const getTask = (current) => {
    const pickerTask = getPickerTask(current);
    setClicked(false);
    setTask(pickerTask.task);
    setAnswer(pickerTask.answer);
    setOptions(pickerTask.options);
    return task;
  };

  const handleOptionClick = (e, selectedOption) => {
    const TRANSITION_TIMEOUT = 500;

    try {
      setTotal((total) => total + 1);
      setClicked(true);

      if (answer === selectedOption) {
        setCorrect((correct) => correct + 1);
      }
      setSelectedOption(selectedOption);

      setTimeout(() => getTask(answer), TRANSITION_TIMEOUT);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="picker-container">
      <div id="picker-performance">
        <PerformanceDisplay correct={correct} total={total} />
      </div>
      <div id="picker-task">{task}</div>
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
