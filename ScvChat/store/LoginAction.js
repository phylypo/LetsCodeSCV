import * as firebaseAuth from '../services/FirebaseAuth'

export const sendLoginAction = (user,succ, fail) => {
  console.log('sendLoginAction--pressing login... user:' + JSON.stringify(user));
  return (dispatch) => {
    dispatch({type: 'LOADING'});
    firebaseAuth.login(user, () => {
        dispatch(loginSuccess(user));
        succ(user);
      }
      , fail
    );
  }
}

export const sendLogoutAction = () => {
  console.log('sendLogoutAction...');
  return (dispatch) => {
    firebaseAuth.onLogout();
    dispatch(logoutSuccess());
  }
}

export const loginSuccess = (user) => (
  {
    type: 'LOGIN',
    payload: user,
  }
);

export const logoutSuccess = () => (
  {
    type: 'LOGOUT',
  }
);
