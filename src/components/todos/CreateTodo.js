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
    }
    
    
    render() {
        // console.log(this.state);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Input s={6} id="subject" onChange={this.handleChange} label="Subject" />
                        <Input s={6} id="content" onChange={this.handleChange} label="Content" />
                    </Row>
                    <Button className="btn deep-orange" waves='light'>Add</Button>
                </form>
            </div>
        )
    }
}

// dispatch to redux for processing.
const mapDispatchToProps = dispatch => {
    return {
        addTodo: (todo) => dispatch(addTodo(todo))
    }
}

export default connect(null, mapDispatchToProps)(AddTodo);