const initState = {
  // uid: localStorage.getItem('uid'),
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
        case 'SIGN_IN':
      console.log('login success');
      return {
        ...state,
        uid: action.res.user.user.uid,
        authError: null,
        authLoaded: true
      }

    case 'SIGNIN_ERROR':
      console.log('err');
      return {
        ...state,
        authError: action.err.message
      };

    case 'SIGN_UP':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }
    
    case 'SIGN_OUT':
      console.log('sign out success')
      return {
        ...state,
        uid: '',
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;