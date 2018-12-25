// create a className and add a form in it to call an action to add to redux.
import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todoActions';


class AddTodo extends Component {
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
        this.props.addTodo(this.state)
        this.setState({
            subject: '',
            content: ''
        })
    }

    render() {
        // console.log(this.props)
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Input s={6} id="subject" defaultValue={this.state.subject} onChange={this.handleChange} label="Subject" />
                        <Input s={6} id="content" defaultValue={this.state.content} onChange={this.handleChange} label="Content" />
                    </Row>
                    <Button className="yellow lighten-2 black-text right" waves='light' modal="close">Add</Button>
                </form>
            </div>
        )}
}

// dispatch to redux for processing.
const mapDispatchToProps = dispatch => {
    return {
        addTodo: (todo) => dispatch(addTodo(todo)),
    }
}

export default connect(null, mapDispatchToProps)(AddTodo);