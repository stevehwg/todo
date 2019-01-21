import { ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_ERROR } from '../constants';

// this is when thunk comes in to do async calls.
export const addTodo = (todo, firestore) => {
    return (dispatch, getState,) => {
        // console.log('todo', todo, 'state', getState(), 'firestore', firestore)
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection('todos').add({
            // author info
            author: `${profile.firstName} ${profile.lastName}`,
            authorId: authorId,
            // content info
            subject: todo.subject,
            content: todo.content,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: ADD_TODO, todo});
        }).catch( err => {
            dispatch({type: ADD_ERROR, err});
        });
    };
};

export const updateTodo = (id, todo, firestore) => {
    // console.log(id, todo, firestore);
    return (dispatch, getState) => {
        firestore.collection('todos').doc(id).update({
            ...todo
        }).then(() => {
            dispatch({type: UPDATE_TODO, todo});
        }).catch(err => {
            dispatch({type: ADD_ERROR, err});
        });
    };
};

export const deleteTodo = (id, firestore) => {
    // console.log("id", id);
    return (dispatch, getState) => {
        firestore.collection('todos').doc(id).delete().then(
            () => {
                dispatch({type: DELETE_TODO});
            })
            .catch(err => {
                dispatch({type: ADD_ERROR, err});
            })
    }
        
};