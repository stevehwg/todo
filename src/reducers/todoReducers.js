import { ADD_TODO } from '../constants';

const defaultState = {
    todoList: [
    {id: '1', subject: 'help me find peach', content: 'blah blah blah'},
    {id: '2', subject: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', subject: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

// maybe the reason we don't add new todo to the dummy is because
// we are adding data to firestore directly.

const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const todo = action.todo
            // dummy id 
            todo['id'] = '4'
            // console.log('state', state)
            return {
                ...state,
                todoList: [...state.todoList, todo]
            }
        default:
            return state;
    }
}

export default todoReducer;