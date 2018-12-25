// create a className and add a form in it to call an action to add to redux.
import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { updateTodo, deleteTodo } from '../../actions/todoActions';


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
        this.props.updateTodo(this.props.todo.id, this.state)
    }
    
    handleDelete = (e) => {
        e.preventDefault();
        // console.log(this.props.todo.id);
        this.props.deleteTodo(this.props.todo.id)
    }

    render() {
        // receive props from TodoDetail
        // console.log(this.state)
        const { subject, content } = this.state;
        return (
            <div className="container">
                <Row>
                    <Input s={6} id="subject" value={subject} onChange={this.handleChange} label="Subject" />
                    <Input s={6} id="content" value={content} onChange={this.handleChange} label="Content" />
                </Row>
                <div className="modal-footer">
                    <Button className="btn red right" waves='light' modal='close' onClick={this.handleDelete}>Delete</Button>
                    <Button className="btn yellow lighten-2 black-text right" modal="close" waves='light' onClick={this.handleSubmit}>Update</Button>
                </div>
            </div>
        )}
}

// dispatch to redux for processing.
const mapDispatchToProps = dispatch => {
    return {
        updateTodo: (id, todo) => dispatch(updateTodo(id, todo)),
        deleteTodo: (id) => dispatch(deleteTodo(id))
    }
}

export default connect(null, mapDispatchToProps)(UpdateTodo);