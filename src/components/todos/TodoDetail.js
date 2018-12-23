import React from 'react';
import UpdateTodo from './UpdateTodo';


export const TodoDetail = ({todo}) => {
    // console.log(todo);
    return (
        <div>
            <h4>{todo.subject}</h4>
            <p>{todo.content}</p>
            <UpdateTodo todo={todo} />
        </div>
    )
}