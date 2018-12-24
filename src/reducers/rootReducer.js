import { combineReducers } from 'redux';
import todoReducers from './todoReducers';

// firebase and firestore reducers
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    todo: todoReducers,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;