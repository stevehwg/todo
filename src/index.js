import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// use compose to connect multiple 
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';

// connect to firestore
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, ReactReduxFirebaseConsumer } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

// firebase and config
import firebase from './fbConfig';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // DOESN'T WORK ANYMORE...
        // reactReduxFirebase(firebase, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
        // reduxFirestore(fbConfig),
    )
);
    
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    attachAuthIsReady: true
};

const rrfProps = {
  firebase: firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

// Not sure how this works now but I use isLoaded in firebase to bypass short flash before reaching firebase.
// store.firebaseAuthIsReady.then(()=>{
//     console.log('auth loaded')
// })

ReactDOM.render(
<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <ReactReduxFirebaseConsumer>
            {context => <App firebase={context} />}
        </ReactReduxFirebaseConsumer>
    </ReactReduxFirebaseProvider>
</Provider>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



