import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignIn from 'components/profile/SignIn';

const mockStore = configureStore([]);

describe('<SignIn />', () => {
  let store, emailInput, pwdInput, submitButton;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    const container = render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    emailInput = container.getByLabelText(/Email/i);
    pwdInput = container.getByLabelText(/Password/i);
    submitButton = container.getByText(/Submit/i).closest('button');
  });

  afterEach(cleanup);

  it('should render empty form', () => {
    expect(emailInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  const cases = [
    ['test', 'test', 'test', 'test'],
    ['test@test ', 'test test', 'test@test', 'testtest'],
    ['@te st.com', ' test ', '@test.com', 'test'],
  ];

  test.each(cases)(
    'should filter input data ["%s", "%s"] and disable submit',
    (email, pwd, expEmail, expPwd) => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(pwdInput, { target: { value: pwd } });
      expect(emailInput.value).toBe(expEmail);
      expect(pwdInput.value).toBe(expPwd);
      expect(submitButton).toBeDisabled();
    },
  );

  it('should successfully validate input data and dispatch login action', () => {
    const email = 'test@test.com';
    const pwd = 'testtest12';
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pwdInput, { target: { value: pwd } });
    expect(emailInput.value).toBe(email);
    expect(pwdInput.value).toBe(pwd);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
