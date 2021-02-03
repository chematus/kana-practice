/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Stats from 'components/profile/Stats';

const mockStore = configureStore([]);

describe('<Stats />', () => {
  afterEach(cleanup);

  it('should render empty panel without stats', () => {
    const initialState = {
      user: {
        username: 'test',
        email: 'test@test.com',
        stats: {
          picker: { correct: 0, total: 0 },
          matcher: { correct: 0, total: 0 },
          canvas: { total: 0 },
        },
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Stats />
      </Provider>,
    );

    expect(getByText(initialState.user.username)).toBeInTheDocument();
    expect(getByText(initialState.user.email)).toBeInTheDocument();
    expect(queryByText(/Matcher/i)).not.toBeInTheDocument();
    expect(queryByText(/Picker/i)).not.toBeInTheDocument();
    expect(queryByText(/Canvas/i)).not.toBeInTheDocument();
    expect(getByText(/Logout/i)).toBeInTheDocument();
  });

  it('should render panel with filled in stats', async () => {
    const initialState = {
      user: {
        username: 'test',
        email: 'test@test.com',
        stats: {
          picker: { correct: 5, total: 28 },
          matcher: { correct: 10, total: 10 },
          canvas: { total: 15 },
        },
      },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Stats />
      </Provider>,
    );

    expect(getByText(initialState.user.username)).toBeInTheDocument();
    expect(getByText(initialState.user.email)).toBeInTheDocument();

    const pickerButton = queryByText(/Picker/i).closest('button');
    expect(pickerButton).toBeInTheDocument();
    fireEvent.click(pickerButton);
    expect(queryByText(/Bad/i)).toBeInTheDocument();

    const matcherButton = queryByText(/Matcher/i).closest('button');
    expect(matcherButton).toBeInTheDocument();
    fireEvent.click(matcherButton);
    expect(queryByText(/Perfect/i)).toBeInTheDocument();

    const canvasButton = queryByText(/Canvas/i).closest('button');
    expect(canvasButton).toBeInTheDocument();
    fireEvent.click(canvasButton);
    expect(queryByText(/15 completed/i)).toBeInTheDocument();
  });

  it('should logout on demand', () => {
    const initialState = {
      user: {
        username: 'test',
        email: 'test@test.com',
        stats: {
          picker: { correct: 5, total: 28 },
          matcher: { correct: 10, total: 10 },
          canvas: { total: 15 },
        },
      },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Stats />
      </Provider>,
    );

    const logoutButton = getByText(/Logout/i).closest('button');
    fireEvent.click(logoutButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
