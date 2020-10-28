import React from 'react';
import PerformanceDisplay from '../PerformanceDisplay';
import TaskGenerator from '../TaskGenerator';
import PickerOption from './PickerOption';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.getPickerTask = TaskGenerator.getPickerTask;
    const task = this.getPickerTask();

    this.state = {
      ...task,
      total: 0,
      correct: 0,
      clicked: false,
      selectedOption: '',
    };
  }

  handleOptionClick = (e, selectedOption) => {
    const TRANSITION_TIMEOUT = 500;
    try {
      const result = { total: this.state.total + 1, clicked: true };
      if (this.state.answer === selectedOption) {
        result.correct = this.state.correct + 1;
      }
      this.setState({ ...result, selectedOption });

      setTimeout(() => this.getTask(this.state.answer), TRANSITION_TIMEOUT);
    } catch (e) {
      console.error(e);
    }
  };

  getTask = (current) => {
    const task = this.getPickerTask(current);
    this.setState({ clicked: false, ...task });
    return task;
  };

  render() {
    return (
      <div id="picker-container">
        <div id="picker-performance">
          <PerformanceDisplay
            correct={this.state.correct}
            total={this.state.total}
          />
        </div>
        <div id="picker-task">{this.state.task}</div>
        <div id="picker-desc">Pick correct transcription</div>
        <div id="picker-options-wrapper">
          {this.state.options.map((item, key) => (
            <PickerOption
              key={key}
              item={item}
              selected={this.state.selectedOption === item}
              correct={this.state.answer === item}
              handleClick={!this.state.clicked && this.handleOptionClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Picker;
