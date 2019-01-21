// create a className and add a form in it to call an action to add to redux.
import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo } from '../../actions/todoActions';

import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';

class UpdateTodo extends Component {
    state = {
        id: null,
        subject: '',
        content: '',
    }
    
    componentDidMount() {
        const {id, subject, content} = this.props.todo;
        this.setState({
            id,
            subject,
            content
        })
    }
    
    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state)
        this.props.updateTodo(this.props.todo.id, this.state, this.props.firestore)
    }
    
    handleDelete = (e) => {
        e.preventDefault();
        // console.log(this.props.todo.id);
        const res = window.confirm('Are you sure you want to delete this record?');
        if (res === true) {
            this.props.deleteTodo(this.props.todo.id, this.props.firestore)
        }
    }

    render() {
        // receive props from TodoDetail
        // console.log(this.state)
        const { subject, content } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <Row>
                    <Input id="subject" m={6} s={12} placeholder={subject} value={subject} onChange={this.handleChange} label="Subject" />
                    <Input id="content" m={6} s={12} placeholder={content} value={content} onChange={this.handleChange} label="Content" />
                </Row>
                <div className="">
                    <Button className="btn yellow lighten-2 black-text" modal="close" waves='light'>Update</Button>
                    <Button className="btn red right" waves='light' modal='close' onClick={this.handleDelete}>Delete</Button>
                </div>
                </form>
                
            </div>
        )}
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    firebase: state.firebase,
    auth: state.firebase.auth
  };
};

// dispatch to redux for processing.
const mapDispatchToProps = dispatch => {
    return {
        updateTodo: (id, todo, firestore) => dispatch(updateTodo(id, todo, firestore)),
        deleteTodo: (id, firestore) => dispatch(deleteTodo(id, firestore))
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirestore
)(UpdateTodo);