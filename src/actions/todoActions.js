import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../constants';

// this is when thunk comes in to do async calls.
export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

export const updateTodo = (todo) => {
    return {
        type: UPDATE_TODO,
        todo
    }
}

export const deleteTodo = (todo) => {
    return {
        type: DELETE_TODO,
        todo
    }
}