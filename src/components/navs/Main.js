import React, { Component } from 'react';
import AddTodo from '../todos/AddTodo';
import TodoList from '../todos/TodoList';
import { Modal, Button, Row, Preloader } from 'react-materialize';
import { Redirect } from 'react-router-dom';

// connect to redux
import { connect } from 'react-redux';

//connect to firestore
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Main extends Component {
  
  render() {
    // console.log(this.props);
    const { todoList, auth } = this.props;
    const { isLoaded, isEmpty } = auth
  
    if (isLoaded && isEmpty) {
      return <Redirect to='/signin' />
    }
  
    return (
      <Row>
        { !isLoaded ?
          <div className="center">
            <Preloader />
          </div>
        :
          <div>
            <div className="row col s12 m12">
              <Modal
                trigger={<Button className="yellow lighten-2 black-text"><i className="icon-plus"></i> Add</Button>}
                actions={false} // this is a default for a close button
              >
                <AddTodo />
              </Modal>
            </div>
          
            <div className="center-align col s12 m6">
              <TodoList todoList={todoList} />
            </div>
            <div className="center-align col s12 m6"><p>Notification</p></div>
          
          </div>
        }
      </Row>
    );
  }
}


const mapStateToProps = state => {
  // console.log('state', state)
  return {
    // state is from rootReducer, "todo" is the name assigned to each reducer.
    // todoList: state.todo.todoList,
    todoList: state.firestore.ordered.todos,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // order by created time in descending order.
    // can add limit to limit the displayed records.
    { collection: 'todos', orderBy: ['createdAt', 'desc'], limit: 5 } 
  ])
)(Main);
