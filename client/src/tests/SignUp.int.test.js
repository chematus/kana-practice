import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignUp from 'components/profile/SignUp';

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

describe('<SignUp />', () => {
  let store, nameInput, emailInput, pwdInput, confInput, submitButton;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    const container = render(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    );

    nameInput = container.getByLabelText(/Username/i);
    emailInput = container.getByLabelText(/Email/i);
    pwdInput = container.getAllByLabelText(/Password/i)[0];
    confInput = container.getByLabelText(/Confirm/i);
    submitButton = container.getByText(/Submit/i).closest('button');
  });

  afterEach(cleanup);

  it('should render empty form', () => {
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(confInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  const cases = [
    ['test ', 'te', 'test', 'test', 'te', 'test'],
    ['te st', 'test@test ', 'test test', 'test', 'test@test', 'testtest'],
    [' test', '@te st.com', ' test ', 'test', '@test.com', 'test'],
  ];

  test.each(cases)(
    'should filter input data ["%s", "%s", "%s"] and disable submit',
    (name, email, pwd, expName, expEmail, expPwd) => {
      fireEvent.change(nameInput, { target: { value: name } });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(pwdInput, { target: { value: pwd } });
      fireEvent.change(confInput, { target: { value: pwd } });
      expect(nameInput.value).toBe(expName);
      expect(emailInput.value).toBe(expEmail);
      expect(pwdInput.value).toBe(expPwd);
      expect(confInput.value).toBe(expPwd);
      expect(submitButton).toBeDisabled();
    },
  );

  it('should filter mismatching password and its confirmation', () => {
    const name = 'test';
    const email = 'test@test.com';
    const pwd = 'testtest12';
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pwdInput, { target: { value: pwd } });
    fireEvent.change(confInput, { target: { value: name } });
    expect(nameInput.value).toBe(name);
    expect(emailInput.value).toBe(email);
    expect(pwdInput.value).toBe(pwd);
    expect(confInput.value).toBe(name);
    expect(submitButton).toBeDisabled();
  });

  it('should validate input data and pass it to the api', () => {
    const name = 'test';
    const email = 'test@test.com';
    const pwd = 'testtest12';
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pwdInput, { target: { value: pwd } });
    fireEvent.change(confInput, { target: { value: pwd } });
    expect(nameInput.value).toBe(name);
    expect(emailInput.value).toBe(email);
    expect(pwdInput.value).toBe(pwd);
    expect(confInput.value).toBe(pwd);
    fireEvent.click(submitButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
