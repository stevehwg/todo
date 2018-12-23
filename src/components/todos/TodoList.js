import React from 'react';
import { Col, Card } from 'react-materialize'

const TodoList = ({todoList}) => {
    console.log('todoList', todoList)
    return (
        <div>
            {todoList.map(todo => {
            return (
                <Col m={12} s={12} key={todo.id}>
                    <Card className='deep-orange lighten-2' textClassName='white-text' title={todo.subject}>
                        {todo.content}
                    </Card>
                </Col>
                )
            })}
        </div>
    )
}

export default TodoList;