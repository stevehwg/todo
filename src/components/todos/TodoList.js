import React from 'react';
import { Row, Col, Card, Modal, Button } from 'react-materialize';
import { TodoDetail } from './TodoDetail';
import moment from 'moment';

const TodoList = ({todoList}) => {
    // console.log(this.props)
    return (
        <div>
            {
            // todoList initially does not have data until it reaches firestore for it. 
            // hence the && operator.
            todoList && todoList.map(todo => {
                // console.log(todo);
                return (
                    <Col m={12} s={12} key={todo.id}>
                        <Card className='grey lighten-1' textClassName='white-text' title={todo.subject}>
                            <Row>{todo.content}</Row>
                            <Row>{moment(todo.createdAt.toDate()).calendar()}</Row>
                            <Modal
                                trigger={<Button className="yellow lighten-2 black-text">Edit</Button>}
                                actions={false} // this is a default for a close button
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