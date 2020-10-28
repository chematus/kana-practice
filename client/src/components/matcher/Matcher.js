import React from 'react';
import TaskGenerator from '../TaskGenerator';
import MatcherOption from './MatcherOption';
import ValidatorDisplay from '../ValidatorDisplay';
import PerformanceDisplay from '../PerformanceDisplay';

class Matcher extends React.Component {
  constructor(props) {
    super(props);

    this.task = [];
    this.state = {
      option1List: [],
      option1Id: '',
      option1Char: '',
      option2List: [],
      option2Id: '',
      option2Char: '',
      disabledList: [],
      correct: null,
      correctAnswers: 0,
      totalAnswers: 0,
    };
  }

  getTask() {
    this.task = this.generateTask();

    const [option1List, option2List] = this.splitTask(this.task);
    this.setState({ option1List, option2List });
  }

  shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  splitTask(arr) {
    return this.shuffleArray([
      this.shuffleArray(arr.map((item) => item[0])),
      this.shuffleArray(arr.map((item) => item[1])),
    ]);
  }

  checkMatch() {
    const char1 = this.state.option1Char;
    const char2 = this.state.option2Char;
    const id1 = this.state.option1Id;
    const id2 = this.state.option2Id;
    const task = this.task;

    if (
      task.some(
        (arr) =>
          (arr[0] === char1 && arr[1] === char2) ||
          (arr[1] === char1 && arr[0] === char2),
      )
    ) {
      const list = [...this.state.disabledList, id1, id2];
      if (list.length >= this.task.length * 2) {
        this.setState((prevState) => ({
          disabledList: [],
          correct: true,
          correctAnswers: prevState.correctAnswers + 1,
        }));
        this.getTask();
      } else {
        this.setState((prevState) => ({
          disabledList: list,
          correct: true,
          correctAnswers: prevState.correctAnswers + 1,
        }));
      }
    } else {
      this.setState({
        correct: false,
      });
    }
    this.setState((prevState) => ({
      option1Id: '',
      option1Char: '',
      option2Id: '',
      option2Char: '',
      totalAnswers: prevState.totalAnswers + 1,
    }));
  }

  handleClick = (column, char, e) => {
    const id = e.currentTarget.id;

    this.setState({
      [column + 'Char']: char,
      [column + 'Id']: id,
      correct: null,
    });
  };

  componentDidMount() {
    this.generateTask = TaskGenerator.getMatcherTask;
    this.getTask();
  }

  componentDidUpdate() {
    const char1 = this.state.option1Char;
    const char2 = this.state.option2Char;

    if (char1.length && char2.length) {
      this.checkMatch();
    }
  }

  render() {
    return (
      <div id="matcher-container">
        <div id="matcher-performance">
          <PerformanceDisplay
            correct={this.state.correctAnswers}
            total={this.state.totalAnswers}
          />
        </div>
        <div id="matcher-task">Match the pairs</div>
        <div id="matcher-options-wrapper">
          <div id="matcher-options-left">
            {this.state.option1List.map((item, key) => {
              const id = key + '_1';
              const stateId = this.state.option1Id;
              return (
                <MatcherOption
                  key={id}
                  id={id}
                  disabled={this.state.disabledList.includes(id)}
                  active={id === stateId ? true : false}
                  handleClick={this.handleClick}
                  column="option1"
                  char={item}
                />
              );
            })}
          </div>
          <ValidatorDisplay correct={this.state.correct} />
          <div id="matcher-options-right">
            {this.state.option2List.map((item, key) => {
              const id = key + '_2';
              const stateId = this.state.option2Id;
              return (
                <MatcherOption
                  key={id}
                  id={id}
                  disabled={this.state.disabledList.includes(id)}
                  active={id === stateId ? true : false}
                  handleClick={this.handleClick}
                  column="option2"
                  char={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Matcher;
