import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button'
import { signIn, googleLogin } from '../../actions/authActions';
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
  }

  handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.props)
      const { firebase } = this.props;
      console.log('logging in...')
      this.props.signIn(this.state, firebase)
      console.log('resetting form state')
      this.setState({
          email: '',
          password: ''
      })
  }

  render() {
    // console.log(this.props)
    const { firebase, googleLogin } = this.props
    // Redirect to home if user is logged in.
    const { isLoaded, isEmpty } = this.props.auth
    if (isLoaded && !isEmpty) {
      return <Redirect to='/' />
    }

    return (
      <Row>
        <Row className="center">
          <form onSubmit={this.handleSubmit}>
            <Col m={12} s={12}>
              <Input type="email" value={this.state.email} id='email' label="Email" s={12} onChange={this.handleFormChange} required/>
              <Input type="password" value={this.state.password} id='password' label="password" s={12} onChange={this.handleFormChange} required/>
              <div>
                <Button className="blue lighten-1" waves='light'>Sign In</Button>
              </div>
            </Col>
          </form>
        </Row>
        <Row className="center">
          <Button className="blue" waves='light' node='a' href="/password_rest">Forgot password?</Button>
        </Row>

        {/* Google auth */}
        <Row className="center">Or</Row>
        <Row className="center">
            <GoogleButton
              label='Sign in with Google'
              type='light'
              onClick={() => googleLogin(firebase)}
            />
        </Row>
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
    },
    googleLogin: firebase => {
      dispatch(googleLogin(firebase))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(SignIn)
