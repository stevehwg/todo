import { combineReducers } from 'redux';
import todoReducers from './todoReducers';
import authReducers from './authReducers';

// firebase and firestore reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    todo: todoReducers,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducers
});

export default rootReducer;