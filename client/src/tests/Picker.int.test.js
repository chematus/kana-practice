/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Picker from 'components/picker/Picker';

const mockStore = configureStore([]);
const initialState = {
  user: {
    stats: {
      picker: { correct: 10, total: 12 },
      matcher: { correct: 5, total: 10 },
      canvas: { total: 15 },
    },
  },
};
const OPTIONS_COUNT = 6;
const EXPECTED_PERFORMANCE = /Amazing/i;

describe('<Picker />', () => {
  let store, getAllByTestId, getByTestId, getByText;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    ({ getAllByTestId, getByTestId, getByText } = render(
      <Provider store={store}>
        <Picker />
      </Provider>,
    ));
  });

  afterEach(cleanup);

  it('should render picker task with mocked stats', () => {
    expect(getByTestId('picker-task')).toBeInTheDocument();
    expect(getAllByTestId('picker-option')).toHaveLength(OPTIONS_COUNT);
    expect(getByText(EXPECTED_PERFORMANCE)).toBeInTheDocument();
  });

  it('should react on task progression', async () => {
    fireEvent.click(getAllByTestId('picker-option')[0]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
