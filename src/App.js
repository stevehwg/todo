import React, { Component } from 'react';
import Navbar from './components/navs/Navbar';
import AddTodo from './components/todos/AddTodo';
import TodoList from './components/todos/TodoList';
import { Modal, Button } from 'react-materialize';

// connect to redux
import { connect } from 'react-redux';

//connect to firestore
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


class App extends Component {
  render() {
    // console.log(this.props);
    const { todoList } = this.props;
    return (
      <div className="container App">
        <Navbar />
        <div className="row">
          <div className="center-align col s12 m6">
            <TodoList todoList={todoList} />
          </div>
          <div className="center-align col s12 m6"><p>Notification</p></div>
        </div>
        <div className="row">
          <div className="col s12 m12">
            <Modal
              trigger={<Button className="yellow lighten-2 black-text">Add</Button>}
              actions={false} // this is a default for a close button
            >
              <AddTodo />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    // state is from rootReducer, "todo" is the name assigned to each reducer.
    // todoList: state.todo.todoList,
    todoList: state.firestore.ordered.todos
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // order by created time in descending order.
    { collection: 'todos', orderBy: ['createdAt', 'desc'] }
  ])
)(App);
