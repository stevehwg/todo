import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../constants';

export const signIn = (cred, firebase) => {
  return (dispatch, getState) => {
    // console.log('cred', cred, 'firebase', firebase);
    firebase.login(cred)
    .then(res => {
      // console.log('user ', res.user.user)
      dispatch({ type: SIGN_IN, res})
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err})
    })
  }
}

export const googleLogin = (firebase) => {
  return (dispatch, getState) => {
    // console.log('firebase', firebase);
    firebase.login({provider: 'google', type: 'popup'})
    .then(res => {
      firebase.updateProfile({userType: 'User'})
      // console.log('user ', res)
      dispatch({ type: SIGN_IN, res})
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err})
    })
  }
}

export const signUp = (cred, firebase) => {
  return (dispatch, getState) => {
    // console.log('cred', cred, 'firebase', firebase);
    firebase.createUser(
      cred,
      {
        email: cred.email,
        firstName: cred.firstName,
        lastName: cred.lastName,
        displayname: `${cred.firstName} ${cred.lastName}`,
        // userType: cred.userType // could be useful for sister's project
      }
    ).then((res) => {
      // console.log('authAction', res)
      console.log('logged in')
      dispatch({ type: SIGN_UP, res})
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
}

export const signOut = (firebase) => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      console.log('logged out');
      dispatch({type: SIGN_OUT})
    })
  }
}
