import { ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_ERROR } from '../constants';

const defaultState = {
    todoList: [
    {id: '1', subject: 'help me find peach', content: 'blah blah blah'},
    {id: '2', subject: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', subject: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
};

// maybe the reason we don't add new todo to the dummy is because
// we are adding data to firestore directly.

const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TODO:
            // const todo = action.todo
            // dummy id 
            // todo['id'] = '4'
            // console.log('add todo', action);
            console.log('Add todo');
            return state;
        case UPDATE_TODO:
            console.log('update todo');
            return state;
        case DELETE_TODO:
            console.log('delete todo');
            return state;
        case ADD_ERROR:
            console.log('add error');
            return state;
        default:
            return state;
    }
};

export default todoReducer;