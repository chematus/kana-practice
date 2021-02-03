/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatcherTask, getKana } from 'components/utils/TaskGenerator';
import ValidatorDisplay from 'components/utils/ValidatorDisplay';
import PerformanceDisplay from 'components/utils/PerformanceDisplay';
import {
  matcherTaskCompleted,
  selectMatcherStats,
  exportStats,
  selectIsLoggedIn,
} from 'components/profile/userSlice';
import MatcherOption from './MatcherOption';

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const splitTask = (arr) => {
  return shuffleArray([
    shuffleArray(arr.map((item) => item[0])),
    shuffleArray(arr.map((item) => item[1])),
  ]);
};

export default () => {
  const [task, setTask] = useState([]);
  const [leftOption, setLeftOption] = useState({ list: [], id: 0, char: '' });
  const [rightOption, setRightOption] = useState({ list: [], id: 0, char: '' });
  const [disabledList, setDisabledList] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const dispatch = useDispatch();
  const { total, correct } = useSelector(selectMatcherStats);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getTask = () => {
    const taskList = getMatcherTask();
    setTask(taskList);
    const [leftList, rightList] = splitTask(taskList);
    setLeftOption((current) => ({ ...current, list: leftList }));
    setRightOption((current) => ({ ...current, list: rightList }));
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
        setIsCorrect(true);
        getTask();
      } else {
        setDisabledList(list);
        setIsCorrect(true);
      }
      dispatch(matcherTaskCompleted({ isCorrect: true }));
    } else {
      setIsCorrect(false);
      dispatch(
        matcherTaskCompleted({
          isCorrect: false,
          kana: getKana(leftOption.char, rightOption.char),
        }),
      );
    }
    setLeftOption((current) => ({ ...current, id: '', char: '' }));
    setRightOption((current) => ({ ...current, id: '', char: '' }));
  };

  const handleClick = (column, char, e) => {
    const { id } = e.currentTarget;

    if (column === 'left') {
      setLeftOption((current) => ({ ...current, char, id }));
    } else {
      setRightOption((current) => ({ ...current, char, id }));
    }
    setIsCorrect(null);

    return false;
  };

  useEffect(() => {
    getTask();
    return () => isLoggedIn && dispatch(exportStats());
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
        <PerformanceDisplay correct={correct} total={total} />
      </div>
      <div id="matcher-task">Match the pairs</div>
      <div id="matcher-options-wrapper">
        <div id="matcher-options-left">
          {leftOption.list.map((item, key) => {
            const id = `${key}_1`;
            const stateId = leftOption.id;
            return (
              <MatcherOption
                key={id}
                id={id}
                disabled={disabledList.includes(id)}
                active={id === stateId}
                handleClick={handleClick}
                column="left"
                char={item}
              />
            );
          })}
        </div>
        <ValidatorDisplay correct={isCorrect} />
        <div id="matcher-options-right">
          {rightOption.list.map((item, key) => {
            const id = `${key}_2`;
            const stateId = rightOption.id;
            return (
              <MatcherOption
                key={id}
                id={id}
                disabled={disabledList.includes(id)}
                active={id === stateId}
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
