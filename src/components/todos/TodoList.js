import React from 'react';
import { Row, Col, Card, Modal, Button } from 'react-materialize';
import { TodoDetail } from './TodoDetail';

const TodoList = ({todoList}) => {
    // console.log('todoList', todoList)
    return (
        <div>
            {
            // todoList initially does not have data until it reaches firestore for it. 
            // hence the && operator.
            todoList && todoList.map(todo => {
                return (
                    <Col m={12} s={12} key={todo.id}>
                        <Card className='deep-orange lighten-2' textClassName='white-text' title={todo.subject}>
                            <Row>{todo.content}</Row>
                        <Modal
                            trigger={<Button className="yellow lighten-2 black-text">Edit</Button>}
                            actions={false}
                        >
                            <TodoDetail todo={todo}/>
                        </Modal>
                        </Card>
                        
                    </Col>
                )
            })
            }
        </div>
    )
}

export default TodoList;