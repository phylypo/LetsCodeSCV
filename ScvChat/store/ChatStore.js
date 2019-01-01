import { combineReducers } from 'redux'

const defaultState = {
  username: "no_name",
  name: "my name",
  email: "test2@gmail.com",
  password: "test123",
  avatar: '',
  loginSuccess: false,
  isLoading: false,
};

const loginReducer = (state=defaultState, action) => {
  console.log("...chatstore...");
  switch(action.type) {
    case "LOGIN":
      console.log('...chatstore: LOGIN action --- email:' + action.payload.email);
      return Object.assign({}, state, {
          email: action.payload.email,
          loginSuccess: true,
          isLoading: false,
      });
    case "LOADING":
      console.log('...chatstore: LOADING action --- ');
      return Object.assign({}, state, {
          isLoading: true,
      });
    case "LOGOUT":
      console.log('...chatstore: LOGOUT action --- ');
      return Object.assign({}, state, {
          loginSuccess: false,
      });
    default:
      return state;
  }
}

export default combineReducers({ login: loginReducer, })
