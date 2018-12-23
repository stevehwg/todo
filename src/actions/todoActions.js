import { ADD_TODO } from '../constants';

// this is when thunk comes in to do async calls.
export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}
