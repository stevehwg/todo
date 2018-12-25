import { ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_ERROR } from '../constants';

// this is when thunk comes in to do async calls.
export const addTodo = (todo) => {
    return (dispatch, getState, {firebase}) => {
        // console.log(getFirestore)
        // console.log(todo, firebase)
        
        firebase.firestore().collection('todos').add({
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

export const updateTodo = (id, todo) => {
    console.log(id, todo);
    return (dispatch, getState, {firebase}) => {
        firebase.firestore().collection('todos').doc(id).update({
            ...todo
        }).then(() => {
            dispatch({type: UPDATE_TODO, todo});
        }).catch(err => {
            dispatch({type: ADD_ERROR, err});
        });
    };
};

export const deleteTodo = (id) => {
    // console.log("id", id);
    return (dispatch, getState, {firebase}) => {
        firebase.firestore().collection('todos').doc(id).delete().then(
            () => {
                dispatch({type: DELETE_TODO});
            })
            .catch(err => {
                dispatch({type: ADD_ERROR, err});
            })
    }
        
};