import React, { useState, useEffect } from 'react';
import { getMatcherTask } from '../TaskGenerator';
import MatcherOption from './MatcherOption';
import ValidatorDisplay from '../ValidatorDisplay';
import PerformanceDisplay from '../PerformanceDisplay';

export default (props) => {
  const [task, setTask] = useState([]);
  const [leftOption, setLeftOption] = useState({ list: [], id: 0, char: '' });
  const [rightOption, setRightOption] = useState({ list: [], id: 0, char: '' });
  const [disabledList, setDisabledList] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  const getTask = () => {
    const taskList = getMatcherTask();
    setTask(taskList);
    const [leftList, rightList] = splitTask(taskList);
    setLeftOption((current) => ({ ...current, list: leftList }));
    setRightOption((current) => ({ ...current, list: rightList }));
  };

  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const splitTask = (arr) => {
    return shuffleArray([
      shuffleArray(arr.map((item) => item[0])),
      shuffleArray(arr.map((item) => item[1])),
    ]);
  };

  const checkMatch = () => {
    const char1 = leftOption.char;
    const char2 = rightOption.char;
    const id1 = leftOption.id;
    const id2 = rightOption.id;

    if (
      task.some(
        (arr) =>
          (arr[0] === char1 && arr[1] === char2) ||
          (arr[1] === char1 && arr[0] === char2),
      )
    ) {
      const list = [...disabledList, id1, id2];
      if (list.length >= task.length * 2) {
        setDisabledList([]);
        setCorrect(true);
        setCorrectAnswers((current) => current + 1);
        getTask();
      } else {
        setDisabledList(list);
        setCorrect(true);
        setCorrectAnswers((current) => current + 1);
      }
    } else {
      setCorrect(false);
    }
    setLeftOption((current) => ({ ...current, id: '', char: '' }));
    setRightOption((current) => ({ ...current, id: '', char: '' }));
    setTotalAnswers((current) => current + 1);
  };

  const handleClick = (column, char, e) => {
    const id = e.currentTarget.id;

    if (column === 'left') {
      setLeftOption((current) => ({ ...current, char, id }));
    } else {
      setRightOption((current) => ({ ...current, char, id }));
    }
    setCorrect(null);

    return false;
  };

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const char1 = leftOption.char;
    const char2 = rightOption.char;

    if (char1.length && char2.length) {
      checkMatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftOption, rightOption]);

  return (
    <div id="matcher-container">
      <div id="matcher-performance">
        <PerformanceDisplay correct={correctAnswers} total={totalAnswers} />
      </div>
      <div id="matcher-task">Match the pairs</div>
      <div id="matcher-options-wrapper">
        <div id="matcher-options-left">
          {leftOption.list.map((item, key) => {
            const id = key + '_1';
            const stateId = leftOption.id;
            return (
              <MatcherOption
                key={id}
                id={id}
                disabled={disabledList.includes(id)}
                active={id === stateId ? true : false}
                handleClick={handleClick}
                column="left"
                char={item}
              />
            );
          })}
        </div>
        <ValidatorDisplay correct={correct} />
        <div id="matcher-options-right">
          {rightOption.list.map((item, key) => {
            const id = key + '_2';
            const stateId = rightOption.id;
            return (
              <MatcherOption
                key={id}
                id={id}
                disabled={disabledList.includes(id)}
                active={id === stateId ? true : false}
                handleClick={handleClick}
                column="right"
                char={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
