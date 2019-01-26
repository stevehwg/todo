// create a className and add a form in it to call an action to add to redux.
import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todoActions';

import { compose } from 'redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';

class AddTodo extends Component {
  state = {
    subject: '',
    content: '',
    slug: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
    // console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(this.props.firebase)
    this.props.addTodo(this.state, this.props.firestore)

    // add slugify subject
    // https://gist.github.com/mathewbyrne/1280286

    this.setState({
        subject: '',
        content: '',
        slug: '',
    })
  }

  render() {
    // console.log(this.props)
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Input id="subject" m={6} s={12} value={this.state.subject} onChange={this.handleChange} label="Subject" />
            <Input id="content" m={6} s={12} value={this.state.content} onChange={this.handleChange} label="Content" />
          </Row>
          <Button className="yellow lighten-2 black-text right" waves='light' modal="close"><i className="icon-plus"></i> Add</Button>
        </form>
      </div>
    )
  }
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
    addTodo: (todo, firestore) => dispatch(addTodo(todo, firestore)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withFirestore
)(AddTodo);
