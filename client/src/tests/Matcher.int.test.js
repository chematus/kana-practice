/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Matcher from 'components/matcher/Matcher';

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
const OPTION_COLUMN_COUNT = 5;
const EXPECTED_PERFORMANCE = /Good/i;

describe('<Matcher />', () => {
  let store, getAllByTestId, getByText;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    ({ getAllByTestId, getByText } = render(
      <Provider store={store}>
        <Matcher />
      </Provider>,
    ));
  });

  afterEach(cleanup);

  it('should render matcher task with mocked stats', () => {
    expect(getAllByTestId('matcher-option-left')).toHaveLength(
      OPTION_COLUMN_COUNT,
    );
    expect(getAllByTestId('matcher-option-right')).toHaveLength(
      OPTION_COLUMN_COUNT,
    );
    expect(getByText(EXPECTED_PERFORMANCE)).toBeInTheDocument();
  });

  it('should react on task progression', () => {
    fireEvent.click(getAllByTestId('matcher-option-left')[0]);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    fireEvent.click(getAllByTestId('matcher-option-right')[0]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
