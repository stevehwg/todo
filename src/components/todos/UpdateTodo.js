// create a className and add a form in it to call an action to add to redux.
import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo } from '../../actions/todoActions';


class UpdateTodo extends Component {
    state = {
        subject: '',
        content: ''
    }
    
    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value
        })
        // console.log(this.state)
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state)
        this.props.updateTodo(this.state)
    }
    
    handleDelete = (e) => {
        e.preventDefault();
        console.log(this.props.todo.id);
        this.props.deleteTodo(this.props.todo.id)
    }

    render() {
        const {todo} = this.props;
        // console.log(todo);
        return (
            <div className="container">
                <Row>
                    <Input s={6} id="subject" defaultValue={todo.subject} onChange={this.handleChange} label="Subject" />
                    <Input s={6} id="content" defaultValue={todo.content} onChange={this.handleChange} label="Content" />
                </Row>
                <div className="modal-footer">
                    <Button className="btn red right" waves='light' onClick={this.handleDelete}>Delete</Button>
                    <Button className="btn yellow lighten-2 black-text right" waves='light' onClick={this.handleSubmit}>Update</Button>
                </div>
            </div>
        )}
}

// dispatch to redux for processing.
const mapDispatchToProps = dispatch => {
    return {
        updateTodo: (todo) => dispatch(updateTodo(todo)),
        deleteTodo: (todo) => dispatch(deleteTodo(todo))        
    }
}

const mapStateToProps = state => {
    return {
        todoList: state.todo.todoList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTodo);