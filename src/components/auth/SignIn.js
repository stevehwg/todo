import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';


class SignIn extends Component {
  state = {
      email: '',
      password: '',
  }
  
  handleFormChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      });
      // console.log(this.state)
  }
  
  handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.props)
      const { firebase } = this.props;
      console.log('logging in...')
      this.props.signIn(this.state, firebase)
      console.log('setting form state')
      this.setState({
          email: '',
          password: ''
      })
  }

  render() {
    // console.log(this.props)
    
    // Redirect to home if user is logged in.
    const { isLoaded, isEmpty } = this.props.auth
    if (isLoaded && !isEmpty) {
      return <Redirect to='/' />
    }
    
    return (
      <Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col m={12} s={12}>
              <Input type="email" value={this.state.email} id='email' label="Email" s={12} onChange={this.handleFormChange} required/>
              <Input type="password" value={this.state.password} id='password' label="password" s={12} onChange={this.handleFormChange} required/>
              <div className="center">
                <Button className="blue lighten-1" waves='light'>Sign In</Button>
              </div>
            </Col>
          </Row>
            
        </form>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (cred, firebase) => {
      dispatch(signIn(cred, firebase))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(SignIn)