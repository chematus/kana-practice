const defaultState = {
  isLoggedIn: false,
  user: {
    email: '',
    username: 'guest',
    stats: {
      picker: {
        correct: 0,
        total: 0,
      },
      matcher: {
        correct: 0,
        total: 0,
      },
      canvas: {
        total: 0,
      },
    },
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { isLoggedIn: true };
    case 'LOG_OUT':
      localStorage.clear();
      return { isLoggedIn: false };
    default:
      return state;
  }
};
