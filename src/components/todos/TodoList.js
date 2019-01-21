import React from 'react';
import { Row, Col, Card, Modal, Button } from 'react-materialize';
import { TodoDetail } from './TodoDetail';
import moment from 'moment';

// connect to redux
import { compose } from 'redux';
import { connect } from 'react-redux'

const TodoList = (props) => {
  const {todoList} = props
  const uid = props.auth.uid
  
  return (
    <div>
      {
      todoList === undefined ? (
        <Row><h1><i className="icon-spinner icon-spin icon-large"></i></h1></Row>
      ) : (todoList.map(todo => {
        // console.log(todo);
        
        return (
          <Col m={12} s={12} key={todo.id}>
              <Card className='grey lighten-1' textClassName='white-text' title={todo.subject}>
                  <Row>{todo.content}</Row>
                  <Row>{moment(todo.createdAt.toDate()).calendar()}</Row>
                  
                  {/* only author should be allowed to edit */}
                  {
                    uid === todo.authorId ?
                    <Modal
                      trigger={<Button className="yellow lighten-2 black-text">Edit</Button>}
                      actions={false} // this is a default for a close button
                    >
                      <TodoDetail todo={todo}/>
                    </Modal>  
                    :
                    null
                  }
                  
              </Card>
          </Col>
        )
      }))
      }
    </div>
  )
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps)
)(TodoList);