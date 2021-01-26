import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Canvas from 'components/canvas/Canvas';
import 'jest-canvas-mock';

const mockStore = configureStore([]);
const initialState = {
  user: {
    stats: {
      picker: { correct: 5, total: 10 },
      matcher: { correct: 10, total: 12 },
      canvas: { total: 15 },
    },
  },
};

describe('<Canvas />', () => {
  let store, getByTestId, queryByTestId, getByText;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    ({ getByTestId, queryByTestId, getByText } = render(
      <Provider store={store}>
        <Canvas />
      </Provider>,
    ));
  });

  afterEach(cleanup);

  it('should render empty canvas with controls and mocked stats', () => {
    [
      getByTestId('canvas-main'),
      getByTestId('canvas-undo').closest('button'),
      getByTestId('canvas-clear').closest('button'),
      getByTestId('canvas-brush-size').closest('button'),
      getByTestId('canvas-brush-color').closest('button'),
      getByTestId('canvas-hint').closest('button'),
      getByTestId('canvas-task').closest('button'),
    ].forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).not.toBeDisabled();
    });
  });

  it('should show task and change it on demand', () => {
    const taskPanel = getByText(/Draw/i).closest('span');
    expect(taskPanel).toBeInTheDocument();
    const taskText = taskPanel.textContent;
    fireEvent.click(getByTestId('canvas-task').closest('button'));
    expect(taskPanel.textContent).not.toBe(taskText);
  });

  it('should show pop-up with hint for current task', () => {
    expect(queryByTestId('canvas-hint-panel')).not.toBeInTheDocument();
    fireEvent.click(getByTestId('canvas-hint').closest('button'));
    expect(getByTestId('canvas-hint-panel')).toBeInTheDocument();
  });

  it('should show range picker to change brush size', () => {
    const sizePanel = getByTestId('canvas-brush-size-panel');
    expect(sizePanel).not.toBeVisible();
    fireEvent.click(getByTestId('canvas-brush-size').closest('button'));
    expect(sizePanel).toBeVisible();
  });

  it('should show palette to change brush color', () => {
    const colorPanel = getByTestId('canvas-brush-color-panel');
    expect(colorPanel).not.toBeVisible();
    fireEvent.click(getByTestId('canvas-brush-color').closest('button'));
    expect(colorPanel).toBeVisible();
  });

  it('should show statistics on completed tasks', () => {
    expect(getByText(/completed/i).closest('span')).toBeInTheDocument();
  });
});
