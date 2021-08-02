import { LOGIN } from '../../constans/login';

const initialState = { loggedIn: false };

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: true };
    default:
      break;
  }
  return state;
};

export default login;
