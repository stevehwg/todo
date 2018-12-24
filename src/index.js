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
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';

// firebase config
import fbConfig from './fbConfig';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        // reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
        // reduxFirestore(fbConfig),
    ));

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch
}    
    
ReactDOM.render(
<Provider store={store}>
    <ReactReduxFirebaseProvider
        firebase={fbConfig}
        config={rrfProps}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
    >
        <App />
    </ReactReduxFirebaseProvider>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



